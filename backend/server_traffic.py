from flask import Flask, jsonify, request
from flask_cors import CORS
import psutil
import time
import platform
import datetime
import socket
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class SystemMonitor:
    def __init__(self, interval=1):
        """Initialize the system monitor with a given interval between checks"""
        self.interval = interval
        self.hostname = socket.gethostname()
        self.ip_address = socket.gethostbyname(self.hostname)
        self.os_info = f"{platform.system()} {platform.release()}"
        
        # Initialize history storage
        self.cpu_history = []
        self.memory_history = []
        self.network_history = []
        self.disk_io_history = []
        
        # Get initial network stats to calculate difference
        self.last_net_io = psutil.net_io_counters()
        self.last_check_time = time.time()
        
    def get_cpu_info(self):
        """Get CPU usage information"""
        cpu_percent = psutil.cpu_percent(interval=None)
        per_cpu = psutil.cpu_percent(interval=None, percpu=True)
        
        # Get CPU frequency if available
        freq = psutil.cpu_freq()
        if freq:
            current_freq = f"{freq.current:.2f} MHz"
        else:
            current_freq = "N/A"
            
        # Track history
        timestamp = datetime.datetime.now()
        self.cpu_history.append((timestamp.isoformat(), cpu_percent))
        if len(self.cpu_history) > 100:  # Keep last 100 readings
            self.cpu_history.pop(0)
            
        return {
            "percent": cpu_percent,
            "per_cpu": per_cpu,
            "frequency": current_freq,
            "cores": psutil.cpu_count(logical=False),
            "threads": psutil.cpu_count(logical=True),
            "history": self.cpu_history
        }
        
    def get_memory_info(self):
        """Get memory usage information"""
        mem = psutil.virtual_memory()
        swap = psutil.swap_memory()
        
        # Track history
        timestamp = datetime.datetime.now()
        self.memory_history.append((timestamp.isoformat(), mem.percent))
        if len(self.memory_history) > 100:
            self.memory_history.pop(0)
            
        return {
            "total": self._format_bytes(mem.total),
            "total_raw": mem.total,
            "available": self._format_bytes(mem.available),
            "available_raw": mem.available,
            "used": self._format_bytes(mem.used),
            "used_raw": mem.used,
            "percent": mem.percent,
            "swap_total": self._format_bytes(swap.total),
            "swap_total_raw": swap.total,
            "swap_used": self._format_bytes(swap.used),
            "swap_used_raw": swap.used,
            "swap_percent": swap.percent,
            "history": self.memory_history
        }
        
    def get_disk_info(self):
        """Get storage information for all disks"""
        disks = {}
        for partition in psutil.disk_partitions():
            try:
                usage = psutil.disk_usage(partition.mountpoint)
                disks[partition.device] = {
                    "mountpoint": partition.mountpoint,
                    "filesystem": partition.fstype,
                    "total": self._format_bytes(usage.total),
                    "total_raw": usage.total,
                    "used": self._format_bytes(usage.used),
                    "used_raw": usage.used,
                    "free": self._format_bytes(usage.free),
                    "free_raw": usage.free,
                    "percent": usage.percent
                }
            except (PermissionError, FileNotFoundError):
                # Some mountpoints may not be accessible
                continue
                
        # Get disk I/O statistics
        disk_io = psutil.disk_io_counters(perdisk=False)
        if disk_io:
            io_stats = {
                "read_bytes": self._format_bytes(disk_io.read_bytes),
                "read_bytes_raw": disk_io.read_bytes,
                "write_bytes": self._format_bytes(disk_io.write_bytes),
                "write_bytes_raw": disk_io.write_bytes,
                "read_count": disk_io.read_count,
                "write_count": disk_io.write_count
            }
            
            # Track disk I/O history
            timestamp = datetime.datetime.now()
            self.disk_io_history.append((timestamp.isoformat(), disk_io.read_bytes, disk_io.write_bytes))
            if len(self.disk_io_history) > 100:
                self.disk_io_history.pop(0)
        else:
            io_stats = {"status": "unavailable"}
            
        return {
            "partitions": disks, 
            "io_stats": io_stats,
            "history": self.disk_io_history
        }
        
    def get_network_info(self):
        """Get network usage information"""
        # Get current stats
        current_time = time.time()
        current_net_io = psutil.net_io_counters()
        
        # Calculate time difference
        time_diff = current_time - self.last_check_time
        
        # Calculate network speed
        bytes_sent = current_net_io.bytes_sent - self.last_net_io.bytes_sent
        bytes_recv = current_net_io.bytes_recv - self.last_net_io.bytes_recv
        
        # Calculate bytes per second
        bytes_sent_per_sec = bytes_sent / time_diff
        bytes_recv_per_sec = bytes_recv / time_diff
        
        # Update last values
        self.last_net_io = current_net_io
        self.last_check_time = current_time
        
        # Track network history
        timestamp = datetime.datetime.now()
        self.network_history.append((timestamp.isoformat(), bytes_sent_per_sec, bytes_recv_per_sec))
        if len(self.network_history) > 100:
            self.network_history.pop(0)
            
        return {
            "ip_address": self.ip_address,
            "hostname": self.hostname,
            "bytes_sent": self._format_bytes(current_net_io.bytes_sent),
            "bytes_sent_raw": current_net_io.bytes_sent,
            "bytes_recv": self._format_bytes(current_net_io.bytes_recv),
            "bytes_recv_raw": current_net_io.bytes_recv,
            "packets_sent": current_net_io.packets_sent,
            "packets_recv": current_net_io.packets_recv,
            "upload_speed": self._format_bytes(bytes_sent_per_sec) + "/s",
            "upload_speed_raw": bytes_sent_per_sec,
            "download_speed": self._format_bytes(bytes_recv_per_sec) + "/s",
            "download_speed_raw": bytes_recv_per_sec,
            "history": self.network_history
        }
    
    def _format_bytes(self, bytes):
        """Format bytes into a human-readable format"""
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if bytes < 1024:
                return f"{bytes:.2f} {unit}"
            bytes /= 1024
        return f"{bytes:.2f} PB"
    
    def get_all_info(self):
        """Get all system information at once"""
        return {
            "cpu": self.get_cpu_info(),
            "memory": self.get_memory_info(),
            "disk": self.get_disk_info(),
            "network": self.get_network_info(),
            "system": {
                "hostname": self.hostname,
                "ip_address": self.ip_address,
                "os_info": self.os_info,
                "timestamp": datetime.datetime.now().isoformat()
            }
        }

# Create a singleton instance of the SystemMonitor
monitor = SystemMonitor()

@app.route('/api/system', methods=['GET'])
def get_system_info():
    """Get all system info"""
    return jsonify(monitor.get_all_info())

@app.route('/api/cpu', methods=['GET'])
def get_cpu_info():
    """Get CPU info"""
    return jsonify(monitor.get_cpu_info())

@app.route('/api/memory', methods=['GET'])
def get_memory_info():
    """Get memory info"""
    return jsonify(monitor.get_memory_info())

@app.route('/api/disk', methods=['GET'])
def get_disk_info():
    """Get disk info"""
    return jsonify(monitor.get_disk_info())

@app.route('/api/network', methods=['GET'])
def get_network_info():
    """Get network info"""
    return jsonify(monitor.get_network_info())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
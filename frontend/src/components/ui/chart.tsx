import type React from "react"

export const BarChart = ({ children, data }: { children: React.ReactNode; data: any[] }) => {
  return <div>{children}</div>
}

export const Bar = ({ dataKey, fill, name }: { dataKey: string; fill: string; name: string }) => {
  return <div />
}

export const XAxis = ({ dataKey }: { dataKey: string }) => {
  return <div />
}

export const YAxis = () => {
  return <div />
}

export const CartesianGrid = ({ strokeDasharray }: { strokeDasharray: string }) => {
  return <div />
}

export const Tooltip = () => {
  return <div />
}

export const Legend = () => {
  return <div />
}

export const ResponsiveContainer = ({
  children,
  width,
  height,
}: { children: React.ReactNode; width: string; height: number }) => {
  return <div style={{ width: width, height: height }}>{children}</div>
}

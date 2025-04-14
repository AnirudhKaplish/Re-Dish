import React from "react"

export const Chart = () => {
  return null
}

export const ChartContainer = ({
  children,
  data,
  xAxisKey,
  yAxisKey,
}: {
  children: React.ReactNode
  data: any[]
  xAxisKey: string
  yAxisKey: string
}) => {
  return React.Children.map(children, (child) => {
    return React.cloneElement(React.Children.only(child) as React.ReactElement, {
      data,
      xAxisKey,
      yAxisKey,
    })
  })
}

export const ChartLegend = () => {
  return null
}

export const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return children
}

export const ChartTooltipContent = ({ children }: { children: React.ReactNode }) => {
  return children
}

export const ChartTooltipItem = ({ children }: { children: React.ReactNode }) => {
  return children
}

export const ChartTooltipLabel = ({ children }: { children: React.ReactNode }) => {
  return children
}

export const ChartTooltipValue = ({ children }: { children: React.ReactNode }) => {
  return children
}

export const ChartXAxis = () => {
  return null
}

export const ChartYAxis = () => {
  return null
}

export const ChartBar = () => {
  return null
}

export const ChartLine = () => {
  return null
}

export const ChartArea = () => {
  return null
}

export const ChartPie = () => {
  return null
}


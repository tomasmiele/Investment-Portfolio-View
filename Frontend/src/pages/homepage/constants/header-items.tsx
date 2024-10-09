import { Wallet, ChartLine, Bank } from '@phosphor-icons/react';

export const headerItems: { name: string, icon: JSX.Element, path: string }[] = [




  {
      name: "Homepage",
      icon: <Wallet size={20} />,
      path: "/homepage"
  },
  {
      name: "Stocks",
      icon: <ChartLine size={20} />,
      path: "/homepage"
  },
  {
      name: "ETF's",
      icon: <Bank size={20} />,
      path: "/homepage"
  },
]
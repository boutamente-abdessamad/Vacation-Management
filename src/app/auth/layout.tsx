import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import ReactQueryProvider from "@utils/ReactQueryProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "../globals.css";

export const metadata: Metadata = {
  title: "Vacation Manager App",
  description: "Vacation Manager App - A simple vacation manager app built with ReactJs and Nextjs.",
};
import theme from '../../../theme/themeConfig';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authSession = await getServerSession(); 
  // Create a client
  authSession?.user && redirect('/dashboard')
  return (
    <html lang="en">
      <ConfigProvider theme={theme}>
          <body className="relative bg-white overflow-hidden max-h-screen">
          <AntdRegistry>
              <ReactQueryProvider >
                  {/* children */}
                  {children}
                  {/* children */}
            </ReactQueryProvider>
          </AntdRegistry>
            
            </body>
      </ConfigProvider>
        </html>
  );
}

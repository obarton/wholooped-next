import React from "react"
import 'react-multi-carousel/lib/styles.css';
import Sidebar from "./Sidebar";

const SidebarWrapper = ({ children }: any) => {
  return (
    <>
      <div id="container" style={{height: "90vh"}}>
        <div id="sidebar" style={{display: "inline-block", verticalAlign: "top", height: "100%", width: "18%", overflow: "auto"}}>
          <Sidebar />
        </div
        ><div id="content" style={{display: "inline-block", verticalAlign: "top", height: "100%", width: "82%", overflow: "auto"}}>
          {children}
        </div>
      </div>
    </>
  )
}

export default SidebarWrapper
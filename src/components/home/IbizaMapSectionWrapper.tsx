"use client";
import dynamic from "next/dynamic";

const IbizaMapSection = dynamic(() => import("./IbizaMapSection"), { ssr: false });

export default IbizaMapSection;

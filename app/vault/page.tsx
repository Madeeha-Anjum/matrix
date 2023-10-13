"use client";
import React, { useContext } from "react";
import Explorer from "@/app/components/Explorer/Explorer";
import { ExplorerContext } from "@/app/store/ExplorerContext";
import Search from "@/app/components/Search/Search";

const Vault: React.FC = () => {
  const { activePath, activeInode, getInodeText } = useContext(ExplorerContext);

  return (
    <>
      <Explorer />
      <section className="flex h-full flex-1 flex-col bg-[#1e293b] p-2 sm:p-4">
        <Search />
        <div className="my-2 flex items-center justify-between font-mono text-sm text-gray-400">
          Location: {activePath}
        </div>
        <textarea
          className="h-full w-full flex-1 resize-none whitespace-pre-wrap break-words border bg-inherit p-2 font-mono text-sm text-gray-300 outline-none"
          value={getInodeText(activeInode)}
          readOnly
        />
      </section>
    </>
  );
};

export default Vault;

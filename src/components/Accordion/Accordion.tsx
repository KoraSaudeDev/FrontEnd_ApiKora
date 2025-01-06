"use client";

import * as AccordionItem from "@radix-ui/react-accordion";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type AccordinProps = {
  items: any;
  defaultValue: string;
  isHash?: boolean;
};

export default function Accordion(props: AccordinProps) {
  const { items, defaultValue, isHash = false } = props;
  const [hash, setHash] = useState("");

  const pathname = usePathname();

  const isActive = (path: string) => {
    if (isHash) {
      return path.split("#")[1] === hash;
    }

    return pathname.includes(path);
  };

  function checkIfAllIsShowFalse(): boolean {
    // Iterate over each item and check if all 'isShow' in 'children' are false
    return items.every((item: any) =>
      item.children.every((child: any) => !child.isShow)
    );
  }

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash.replace("#", "")); // Atualiza o estado com o novo hash
    };

    // Inicializa o hash ao carregar o componente
    updateHash();

    // Adiciona o ouvinte para mudanças no hash
    window.addEventListener("hashchange", updateHash);

    // Limpeza do ouvinte quando o componente for desmontado
    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);


  return (
    <AccordionItem.Root
      className="px-3"
      type="single"
      defaultValue={defaultValue}
      collapsible
    >
      {items.map((item: any, index: number) => (
        <AccordionItem.Item
          key={index}
          className="overflow-hidden"
          value={item.item}
        >
          {!checkIfAllIsShowFalse() && (
            <AccordionItem.Trigger className=" font-medium flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180 text-sm mb-2 text-[#284557]">
              <span>{item.item}</span>
              <IoIosArrowDown className="transition-transform duration-200" />
            </AccordionItem.Trigger>
          )}

          <AccordionItem.Content className="overflow-hidden text-[#284557] text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down transition-all">
            <div className="flex flex-col w-full px-2 gap-2 mb-2">
              {item.children.map((option: any, index: any) => {
                if (option.isShow) {
                  // Verifique se a opção deve ser exibida
                  return (
                    <a
                      key={index}
                      href={option.path}
                      data-active={isActive(option.path)}
                      className="hover:opacity-75 transition-all data-[active=true]:font-medium data-[active=true]:text-blue-600"
                    >
                      {option.label}
                    </a>
                  );
                }
                return null;
              })}
            </div>
          </AccordionItem.Content>
        </AccordionItem.Item>
      ))}
    </AccordionItem.Root>
  );
}

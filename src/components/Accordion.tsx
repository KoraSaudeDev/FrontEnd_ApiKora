"use client"

import * as AccordionItem from "@radix-ui/react-accordion";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";

type AccordinProps = {
  items: any;
};

export default function Accordion(props: AccordinProps) {
  const { items } = props;
  const [hash, setHash] = useState('');

  useEffect(() => {
    // Função para atualizar o hash
    const updateHash = () => {
      setHash(window.location.hash.replace('#', '')); // Atualiza o estado com o novo hash
    };

    // Inicializa o hash ao carregar o componente
    updateHash();

    // Adiciona o ouvinte para mudanças no hash
    window.addEventListener('hashchange', updateHash);

    // Limpeza do ouvinte quando o componente for desmontado
    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, []);


  return (
    <AccordionItem.Root
      className="p-3"
      type="single"
      defaultValue="Verzo"
      collapsible
    >
      {items.map((item: any, index: number) => (
        <AccordionItem.Item
          key={index}
          className="overflow-hidden"
          value={item.item}
        >
          <AccordionItem.Trigger className=" font-medium flex justify-between items-center w-full [&[data-state=open]>svg]:rotate-180 text-sm mb-2 text-[#284557]">
            <span>{item.item}</span>{" "}
            <IoIosArrowDown className="transition-transform duration-200" />
          </AccordionItem.Trigger>
          <AccordionItem.Content className="overflow-hidden text-[#284557] text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down transition-all">
            <div className="flex flex-col w-full px-2 gap-2 mb-2">
            {item.children.map((option:any , index: any) => (
              <a key={index} href={option.path} data-active={option.path.split('#')[1] === hash}  className="hover:opacity-75 transition-all data-[active=true]:font-medium data-[active=true]:text-blue-600">
                {option.label}
              </a>
            ))}
            </div>
           
          </AccordionItem.Content>
        </AccordionItem.Item>
      ))}
    </AccordionItem.Root>
  );
}

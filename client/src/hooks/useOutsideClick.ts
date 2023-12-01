import { useEffect, useRef } from "react";

export const  useOutsideClick = (handler: ()=>void) => {
    const ref = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        //@ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      }
      document.addEventListener("mouseup", handleClickOutside);
      return () => {
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }, [ref]);
    return ref;
  }
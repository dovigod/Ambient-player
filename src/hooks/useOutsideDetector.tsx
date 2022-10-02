import { useEffect, RefObject } from "react";
let pass = true;
const useOutsideDetector = (refs : RefObject<any>[], handler : any , active : boolean) =>{
  useEffect(
    () => {
    if(!active){
        return;
    }

    const listener = (event : any) => {
        if(pass){
            pass =false;
            return;
        }
        let trigger = true;
        console.log(event.target)
        refs.map(ref => {
            if (!ref.current || ref.current.contains(event.target)) {
                trigger = false;
            }
        })

        console.log(trigger)

        if(trigger){
            handler()
            document.removeEventListener("click", listener);
            pass =true;
        }
        
    };
    document.addEventListener("click", listener);

    return () => {
        document.removeEventListener("click", listener);
    };
    },
);
}
export default useOutsideDetector;
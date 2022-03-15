import { useToast } from "@chakra-ui/react";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
/* export const fetcher = (...args) => {
  console.log(...args);
  fetch(...args).then((res) => {
    console.log(res.json());
    //return res.json();
  });
};
 */

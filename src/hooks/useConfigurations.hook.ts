import { ConfigurationContext } from "@/contexts/configuration.context";
import { useContext } from "react";

export default function useConfigurations() {
  const context = useContext(ConfigurationContext);

  if (!context) {
    throw new Error(
      "useConfigurations must be used within a ConfigurationProvider"
    );
  }

  return context;
}

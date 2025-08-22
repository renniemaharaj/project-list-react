import { useAtomValue } from "jotai";
import { BookIcon } from "@primer/octicons-react";
import {
  showBackendFeaturesAtom,
} from "../../state/app.atoms";
import { Blankslate } from "@primer/react/experimental";
const SidePane = () => {
  const showBackendFeatures = useAtomValue(showBackendFeaturesAtom);
  return (
    <>
        <Blankslate>
          <Blankslate.Visual>
            <BookIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading>File Explorer</Blankslate.Heading>
          <Blankslate.Description>
            {showBackendFeatures
              ? "You don't have any files, create some. They will be listed here."
              : "Sign in to see your files. You'll see your documents here if you have any."}
          </Blankslate.Description>

          <Blankslate.PrimaryAction href="/create">
            New Document
          </Blankslate.PrimaryAction>
        </Blankslate>
      
    </>
  );
};

export default SidePane;

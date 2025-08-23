import { useState } from "react";
import { SubdomainNavBar } from "@primer/react-brand";
import AuthUser from "../../../pkg/firebase/auth/AuthUser";

import "./styles.css";
import { useAtomValue } from "jotai";
import {
  showCreateFormAtom,
  showUpdateFormAtom,
} from "../../../state/app.atoms";
import LinkText from "../sidepane/LinkText";

const SubNavBar = () => {
  const [subDomain] = useState("HRTM Projects");
  const showCreateForm = useAtomValue(showCreateFormAtom);
  const showUpdateForm = useAtomValue(showUpdateFormAtom);

  return (
    <SubdomainNavBar
      className={`${showCreateForm || showUpdateForm ? "!static" : ""}`}
      logoHref="/"
      title={subDomain}
      fixed={false}
    >
       <SubdomainNavBar.Link href="/"><LinkText text="Master"/></SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="/consultants"><LinkText text="Consultants"/></SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="/na"><LinkText text="North America"/></SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="/sa"><LinkText text="South America"/></SubdomainNavBar.Link>
      {/* <SubdomainNavBar.Link href="/us">USA</SubdomainNavBar.Link> */}
      {/* <SubdomainNavBar.Search onSubmit={() => {}} onChange={() => {}} /> */}
      <SubdomainNavBar.PrimaryAction
        href="/create"
      >
        New Project
      </SubdomainNavBar.PrimaryAction>
      {/* <SubdomainNavBar.SecondaryAction className={actionClassName()} href="#">
        New Page
      </SubdomainNavBar.SecondaryAction> */}
      <SubdomainNavBar.SecondaryAction href="#" className="!border-none">
        <AuthUser variant="image" />{" "}
      </SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  );
};

export default SubNavBar;

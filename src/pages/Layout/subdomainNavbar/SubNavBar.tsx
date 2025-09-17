import { useState } from "react";
import { SubdomainNavBar } from "@primer/react-brand";

import "./styles.css";
import { useAtom, useAtomValue } from "jotai";

import LinkText from "../sidepane/LinkText";
import { sanitizeSearchQuery } from "./utils";
import { domainSearchQueryAtom, showCreateFormAtom, showUpdateFormAtom } from "../../../state/app.atoms";
import { useNavigationTransition } from "../../../state/hooks/transition/useNavigationTransition";
import AuthUser from "../../../pkg/firebase/auth/AuthUser";

const SubdomainNavbar = () => {
  const [subDomain] = useState("HRTM Projects");
  const showCreateForm = useAtomValue(showCreateFormAtom);
  const showUpdateForm = useAtomValue(showUpdateFormAtom);

  const { transitionTo } = useNavigationTransition();

  const [searchQuery, setSearchQuery] = useAtom(domainSearchQueryAtom);

  const searchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!searchQuery) return;

    const sanitized = sanitizeSearchQuery(searchQuery);
    if (sanitized.length > 0) {
      transitionTo(`/search/${sanitized}`);
    }
  };

  return (
    <SubdomainNavBar
      className={`${showCreateForm || showUpdateForm ? "!static" : ""}`}
      logoHref="/"
      title={subDomain}
      fixed={false}
    >
      <SubdomainNavBar.Link href="/">
        <LinkText text="Master" />
      </SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="/consultants">
        <LinkText text="Consultants" />
      </SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="/na">
        <LinkText text="North America" />
      </SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="/sa">
        <LinkText text="South America" />
      </SubdomainNavBar.Link>
      <SubdomainNavBar.Search
        onSubmit={searchFormSubmit}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SubdomainNavBar.PrimaryAction href="/create">
        New Project
      </SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#" className="!border-none">
        <AuthUser variant="image" />
      </SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  );
};

export default SubdomainNavbar;

// import Card from "@mui/material/Card";
// import useThemeContext from "../../state/hooks/theme/useThemeContext";
import { Flex, Heading } from "@radix-ui/themes";
import { Token } from "@primer/react";

const ProjectSkeleton = () => {
  // const { theme } = useThemeContext();
  return (
    <div className="text-sm border-b border-gray-200 hover:bg-blue-50">
      <Flex className="flex flex-row !justify-between items-center p-1">
        {/* <Link onClick={() => transitionTo(`/project/${project.ID}`)}> */}
        <Heading className="cursor-pointer !text-sm">
          {/* {project.name} */}
        </Heading>
        {/* </Link> */}
        <Token color={"green"} text={"Loading"} />
      </Flex>
    </div>
  );
};

export default ProjectSkeleton;

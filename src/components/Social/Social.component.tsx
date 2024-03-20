import {IconRenderer} from "..";
import type {$SocialProperties} from "./Social.types";

function Social(properties: $SocialProperties): JSX.Element {
  return (
    <li key={properties.id} className="mr-5 text-xs shrink-0">
      <a className="block hover:text-sky-100" href={properties.href} target="_blank" rel="noreferrer noopener" title={properties.title} aria-label={properties.title}>
        {properties.icon && <IconRenderer type={properties.icon}/>}
      </a>
    </li>
  );
}

export default Social;
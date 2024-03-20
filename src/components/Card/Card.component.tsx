import {$CardProperties} from "./Card.types";

function Card(properties: $CardProperties): JSX.Element {
  return (
    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-sky-900/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
      <div className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-sky-200/50 sm:col-span-2">{properties.date}</div>
      <div className="z-10 sm:col-span-6">
        <h3 className="font-medium leading-snug">
          <div>
            <a className="inline-flex items-baseline font-medium leading-tight text-sky-100 hover:text-amber-200 focus-visible:text-amber-200  group/link text-base" href={properties.href} target="_blank" rel="noreferrer noopener">
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
              <span>{properties.company}</span>
            </a>
          </div>
          <div>
            <div className="text-sky-200/50">{properties.position}</div>
          </div>
        </h3>
        <div className="mt-2 text-sm leading-normal">{properties.description}</div>
        <ul className="mt-2 flex flex-wrap" aria-label="Stack used">
          {properties.stack.map(item => {
            return (
              <li className="mr-1.5 mt-2" key={item}>
                <div className="flex items-center rounded-full bg-amber-300/10 px-3 py-1 text-xs font-medium leading-5 text-amber-200 ">{item}</div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default Card;
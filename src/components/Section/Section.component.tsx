import type {$SectionProperties} from "./Section.types";

function Section(properties: $SectionProperties): JSX.Element {
  return (
    <section className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-sky-100">{properties.title}</h2>
      </div>
      <div>{properties.children}</div>
    </section>
  );
}

export default Section;
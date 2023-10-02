import GenderBox from "../components/GenderBox";

export default function GenderSelection() {
  return (
    <>
      <section className="flex flex-col lg:flex-row w-full">
        <GenderBox title="Men" route="men" gradient="gradient1"/>
        <GenderBox title="Women" route="women" gradient="gradient2"/>
      </section>
    </>
  );
}

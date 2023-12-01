import Title from "@/components/title";

export default async function Home() {
  return (
    <>
      <Title title="홈" />
      <button className="btn btn-primary">Hello daisyUI!</button>
      <button
        className="h-10 px-6 font-semibold rounded-md bg-black text-white"
        type="submit"
      >
        Buy now
      </button>
    </>
  );
}

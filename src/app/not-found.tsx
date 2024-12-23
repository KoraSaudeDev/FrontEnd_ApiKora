export default async function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F9FAFB]">
      <div className="flex max-w-[444px] flex-col items-center justify-center text-center">
        <h1 className="max-w-[444px] pb-[18px] pt-12 text-[200px] font-semibold leading-[148px] tracking-[22px] text-[#3e4676]">
          404
        </h1>
        <p className="max-w-[400px] text-heading-3 font-normal text-[#3e4676] mt-6">
        Página não encontrada!
        </p>
      </div>
    </div>
  );
}

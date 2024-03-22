import Image from 'next/image'

export  function Spinner() {
  return (
    // <Image src='/tube-spinner.svg' width={36} height={36} alt='spinner' />
    <div className="border-gray-300 bg-transparent h-7 w-7 animate-spin rounded-full border-[2px] border-t-neutral-900" />
  )
}

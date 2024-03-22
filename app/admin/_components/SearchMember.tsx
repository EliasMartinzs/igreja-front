import {Dispatch, SetStateAction} from 'react'

interface ISearchMember {
  searchMember: string
  setSearchMember: Dispatch<SetStateAction<string>>
}

export function SearchMember(props: ISearchMember) {
  const {searchMember,setSearchMember} = props
  return (
    <input value={searchMember} onChange={e => setSearchMember(e.target.value)} className='input-mask' placeholder="Buscar por membros..."/>
  )
}

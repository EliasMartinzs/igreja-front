import { Dispatch, SetStateAction } from 'react';

interface ISearchMember {
    searchMember: string;
    setSearchMember: Dispatch<SetStateAction<string>>;
    placeholder: string;
}

export function BuscarMembros(props: ISearchMember) {
    const { searchMember, setSearchMember, placeholder } = props;
    return (
        <input
            value={searchMember}
            onChange={(e) => setSearchMember(e.target.value)}
            className="input-mask"
            placeholder={placeholder}
        />
    );
}

import useDataContext from "../context/DataContext";

const Dropdown = ({ obj }) => {
    
    const {open, setOpen,handleCategory } = useDataContext();
    const handleOpen = (type) => {
        if (open === type) {
            setOpen(null);
        } else {
            setOpen(null);
            setTimeout(() => {
                setOpen(type);
            }, 50);
        }
    };

    return (
        <div className="grow-0">
            <p className='inline-block px-3 py-2 text-white rounded-md max-w-[200px] w-full font-[poppins] font-bold bg-orange-600' onClick={() => handleOpen(obj?.title.toLowerCase())}>{obj?.title}</p>
            <div name={obj?.title.toLowerCase()} id={obj?.title.toLowerCase()} className={(open === obj?.title.toLowerCase() ? 'block' : 'hidden') + ' rounded-xl focus:outline-none px-5 py-2 text-md font-[poppins] font-bold max-w-[200px] h-[250px] overflow-y-scroll z-999 bg-white'}>
                {obj?.options.map((item) => (<div key={item} onClick={(e) => handleCategory(item, obj?.title.toLowerCase())} value={item}>{item}</div>))}
            </div>
        </div>
    )
}

export default Dropdown
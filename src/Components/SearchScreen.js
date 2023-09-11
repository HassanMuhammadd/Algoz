import React, {useEffect, useState} from 'react'
import Box from './Box';

export default function SearchScreen({type}) {
	const [nums,setNums] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    const [size,setSize] = useState(15);
    const [target,setTarget] = useState(-6556);
    const [found,setFound] = useState(-1);
    const [disabled,setDisabled] = useState(false)

    useEffect(()=>{
        var boxes = document.querySelectorAll(".box");
        for(let i = 0;i<boxes.length;i++)
        {
            boxes[i].classList.remove("active","found","ptr","disabled");
        }

    },[window.location.pathname]);

    const handleChange=(e)=>{
            var temp = [];
            var sz =e.target.value;
            setSize(sz);
            if(sz>100 || sz<1)
            {
                setNums([]);
                return;
            }
            for(let i = 1;i<=sz;i++)
                temp.push(i);
            setNums(temp);
    }

    const clearBoxes = ()=>{
        var boxes = document.querySelectorAll(".box");
        for(let i = 0;i<boxes.length;i++)
        {
            boxes[i].classList.remove("active","found","ptr","disabled");
        }
    }

    async function linearSearch(){
        setFound(-1);
        setDisabled(true);
        if(target===-1)
        {
            setFound(0);
            return;
        }
        var boxes = document.querySelectorAll(".box");
        clearBoxes();


        for(let i = 0;i<boxes.length;i++)
        {
            if(window.location.pathname==='/binary')
            {
                clearBoxes();
                break;
            }
            var num = boxes[i].textContent;
            boxes[i].classList.add("active","ptr");

            if(num===target)
            {
                boxes[i].classList.add("found");
                setFound(1);
                setDisabled(false);
                return;
            }

            await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 50))

            boxes[i].classList.remove("active","ptr");
        }
        setDisabled(false);
        setFound(0);
    }

    async function binarySearch(){
        if(target===-1)
        {
            setFound(0);
            return;
        }
        setFound(-1);
        let text = document.querySelector(".binarySearchText");
        //clearing pointers
        setDisabled(true);
        var boxes = document.querySelectorAll(".box");
        clearBoxes();

        let low = 0,high = boxes.length-1;
        while(low<=high)
        {
            if(window.location.pathname==='/linear')
            {
                clearBoxes();
                break;
            }

            let mid = Math.ceil((low+high)/2);
            text.textContent=`low: ${low+1}, high: ${high+1}, Mid: ${mid+1}`;
            var num = boxes[mid].textContent;
            boxes[mid].classList.add("active","ptr");

            await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 1000))

            if(num===target)
            {
                boxes[mid].classList.add("found");
                setFound(1);
                setDisabled(false);
                return;
            }
            if(Number(num)>Number(target))
            {
                for(let i = Number(num)-1;i<boxes.length;i++)
                {
                    boxes[i].classList.add("disabled");
                }
                high = mid-1;
            }
            else
            {

                for(let i = 0;i<=Number(mid);i++)
                {
                    boxes[i].classList.add("disabled");
                }
                low = mid+1;
            }


            boxes[mid].classList.remove("active","ptr");
        }
        setDisabled(false);
        setFound(0);
    }


    return (
	<>
    <div className="text-center text-white mt-md-3">{type===2?"Linear Search":"Binary search"}</div>
		<div className="p-sm-5 p-3 holder d-flex flex-column justify-content-between align-items-center text-white ">

                    <div className={`d-flex flex-row align-content-start boxHolder ${nums.length<=24?"justify-content-center":""} `}>
                    {
                        nums.map((num)=>{
                            return <Box
                                    number={num}
                                    key={num}
                                    type={0}
                                    />
                        })
                    }
                    </div>
                <div className="container ">
                {
                    window.location.pathname==='/binary'?
                    <div className='text-center binarySearchText mt-3'></div>:""
                }
                {/*Form For entering Size*/}
                <div className="row  justify-content-center align-items-end mt-5">
                    <div className="col d-flex flex-column align-items-center justify-content-center  searchBox">

                        <div className='d-flex flex-row gap-4 '>
                            <div className='d-flex flex-column align-items-center justify-content-end'>

                                <h6 className='mt-3'>Enter Size</h6>
                                <input
                                value={size}
                                className="my-2 numbersInput"
                                type="number"
                                onChange={(e)=>handleChange(e)}
                                />
                            </div>


                        </div>
                    </div>

                <div className="d-flex flex-column col align-items-center justify-content-center searchBox">

                        <h6 className='mt-3 text-center'>Enter Number to search for</h6>
                        <input
                        className="my-2 numbersInput"
                        type="number"
                        onChange={(e)=>{setTarget(e.target.value)}}
                        />
                    </div>
                </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">

                        <button
                        className='searchButton px-3 py-2 text-dark fw-bold mt-3'
                        disabled={disabled}
                        onClick={type===1?binarySearch:linearSearch}
                        >Search</button>

                        {found===1?<span className='mt-3'>Found Number!</span>
                        :found===0?<span className='mt-3'>Number Not Found</span>:
                        target===-6556?<span className='mt-3'>Please enter a number</span>:
                        <span className='mt-3 hidden'>hi</span>}
                        {size>100 || size<1?"Size Must be between 1 and 100":" "}

                    </div>
                </div>
            </div>
	</>
    )
}

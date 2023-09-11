import React, {useEffect, useState} from 'react';
import Box from './Box';

export default function Bfs() {

	const [nums,setNums] = useState([]);
    const [size,setSize] = useState(6);
    const [cell,setCell] = useState();
    const [target,setTarget] = useState(-6556);
    const [found,setFound] = useState(-1);
    const [disabled,setDisabled] = useState(false)
    var dRow = [-1,1,0,0];
    var dCol = [0,0,1,-1];


    useEffect(()=>{
		handleNums();
        colorCell();
	},[size, cell])

    const handleChange =(e)=>{
        let sz = e.target.value;
        if(sz>7 || sz<=0)
        {
            setSize()
        }
        else
            setSize(e.target.value);
        return;
    }

	const handleNums = ()=>{
		var arr=[];
		for(let i = 0;i<size;i++)
        {
            let temp=[];
            for(let j = 0;j<size;j++)
                temp.push(i*size+j+1);
            arr.push(temp);
        }
		setNums(arr);
	}

    const clearBfsBoxes = ()=>{
            var boxes = document.querySelectorAll(".bfsBox");
            for(let i = 0;i<boxes.length;i++)
            {
                boxes[i].classList.remove("active","found","ptr","disabled");
            }

    }

    const colorCell=()=>{
        clearBfsBoxes();
        var boxes = document.querySelectorAll(".bfsBox");
        for(let i = 0;i<boxes.length;i++)
        {
            if(boxes[i].textContent===cell)
            {
                boxes[i].classList.add("found")
            }
            else
            {
                boxes[i].classList.remove("found")
            }

        }
    }

    function isValid(vis, row, col)
    {
        if (row < 0 || col < 0
            || row >= size || col >= size)
            return false;

        if (vis[row][col]===true)
            return false;

        return true;
    }

    const checkIfVis=(vis)=>{
        var boxes = document.querySelectorAll(".bfsBox");

        for(let i = 0;i<nums.length;i++){
            for(let j = 0;j<nums[i].length;j++)
            {
                if(vis[i][j]===true)
                {
                    if(i*size+j+1<=boxes.length )
                        boxes[i*size+j].classList.add("active");

                }
            }
        }
    }
    function findCell(){
        for(let i = 0;i<nums.length;i++)
        {
            for(let j = 0;j<nums[i].length;j++)
            {
                if(nums[i][j]===Number(cell))
                return true;
            }
        }

        return false;
    }
    async function BFS(){
        if(cell === undefined || findCell() === false)
            {
                return;
            }

        setFound(-1);
        clearBfsBoxes();
        colorCell();
        if(Number(target)===Number(cell))
        {
            setFound(1);
            return;
        }
        var boxes = document.querySelectorAll(".bfsBox");
        setDisabled(true)
        var si,sj;
        var vis = Array.from({ length:size }, () => (Array.from({ length:size }, ()=> false)))
        checkIfVis(vis);

        for(let i = 0;i<nums.length;i++)
        {
            for(let j = 0;j<nums[i].length;j++)
            {
                if(nums[i][j]===Number(cell))
                {
                    si = i;
                    sj = j;
                    break;
                }
            }
        }

        var q = [];
        q.push([si,sj]);
        vis[si][sj] = true;
        while (q.length!==0) {
            var c = q[0];
            checkIfVis(vis);
            var x = c[0];
            var y = c[1];

            q.shift();
            await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 250))

            for (var i = 0; i < 4; i++) {
                var adjx = x + dRow[i];
                var adjy = y + dCol[i];
                if (isValid(vis, adjx, adjy))  {
                    q.push([adjx, adjy ]);
                    if(nums[adjx][adjy]===Number(target))
                    {
                        setFound(1);
                        setDisabled(false);
                        boxes[adjx*size+adjy].classList.add("found");
                        return;
                    }
                    vis[adjx][adjy] = true;
                }
            }
        }

        setFound(0);
        setDisabled(false)
    }

    return (
	<>
    <div className="text-center text-white mt-3">Breadth First search</div>
		<div className="p-5 holder d-flex flex-column justify-content-between align-items-center text-white ">

                    <div className={`d-flex flex-column align-content-center boxHolder justify-content-center `}>
                    {

                        nums.map(row=>{
                            return <div key={row} className="d-flex flex-row">
                                {
                                    row.map(num=>{
                                        return <Box key={num} number={num}/>
                                    })
                                }
                            </div>
                        })

                    }
                    </div>
                <div className="container ">

                {/*Form For entering Size*/}
                <div className="row  justify-content-center align-items-end mt-3">
                    <div className="col d-flex flex-column align-items-center justify-content-center  searchBox">

                        <div className='d-flex flex-row gap-4 '>
                            <div className='d-flex flex-column align-items-center justify-content-end'>

                                <h6 className='mt-3'>Enter Size</h6>
                                <input
                                value={size}
                                className={`my-2 numbersInput ${disabled?"cursor":""}`}
                                type="number"
                                onChange={(e)=>{handleChange(e);handleNums()}}
                                disabled = {disabled}
                                />
                            </div>


                        </div>
                    </div>
                    <div className="col d-flex flex-column align-items-center justify-content-center  searchBox">

                        <div className='d-flex flex-row gap-4 '>
                            <div className='d-flex flex-column align-items-center justify-content-end'>

                                <h6 className='mt-3'>Enter Starting Cell</h6>
                                <input
                                value={cell}
                                className={`my-2 numbersInput ${disabled?"cursor":""}`}
                                type="number"
                                onChange={(e)=>{setCell(e.target.value);colorCell()}}
                                disabled = {disabled}
                                />
                            </div>


                        </div>
                    </div>

                <div className="d-flex flex-column col align-items-center justify-content-center searchBox">

                        <h6 className='mt-3 text-center'>Enter Number to search for</h6>
                        <input
                        className={`my-2 numbersInput ${disabled?"cursor":""} `}
                        type="number"
                        onChange={(e)=>{setTarget(e.target.value)}}
                        disabled = {disabled}
                        />
                    </div>
                </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">

                        <button
                        className={`searchButton px-3 py-2 text-dark fw-bold mt-3 ${disabled?"cursor":""}`}
                        disabled={disabled}
                        onClick={BFS}
                        >Start</button>

                        {found===1?<span className='mt-3'>Found Number!</span>
                        :found===0?<span className='mt-3'>Number Not Found</span>:
                        <span className='mt-3 hidden'>hi</span>}
                        {findCell()===false?"Please enter a valid starting Cell":""}
                        {(size===undefined)?"Dimensions Must be between 1 and 7":""}
                    </div>
                </div>
            </div>
	</>
    )
}

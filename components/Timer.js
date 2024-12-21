import './Timer.scss';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';
import {useEffect, useState} from 'react';
import Header from "@/components/Header";
import ResultTable from "@/components/ResultTable";
import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import DatePicker from "@/components/DatePicker";


function StaticCard({position, number}) {
    return (<div className={`flip-clock__unit__static flip-clock__unit__static--${position}`}>
            <span className="t-clock">{number.toString().padStart(2, '0')}</span>
        </div>);
}

function AnimationCard({animation, number}) {
    return (<div className={`flip-clock__unit__flip flip-clock__unit__flip--${animation}`}>
            <span className="t-clock">{number.toString().padStart(2, '0')}</span>
        </div>);
}

function FlipClock({hours, minutes, seconds}) {
    return (<div className="flip-clock">
            <FlipClockUnit number={hours} unit={'hours'}/>
            <FlipClockUnit number={minutes} unit={'minutes'}/>
            <FlipClockUnit number={seconds} unit={'seconds'}/>
        </div>);
}

function getPrevNumber(number, unit) {
    if (unit === 'hours') {
        return number === 24 ? 0 : number;
    }
    if (unit === 'minutes' || unit === 'seconds') {
        return number === 60 ? 0 : number;
    }
    return number;
}

function FlipClockUnit({number, unit}) {
    const currentNumber = number;
    const previousNumber = getPrevNumber(number + 1, unit);
    const [swap, setSwap] = useState(false);

    useEffect(() => {
        setSwap((prev) => !prev);
    }, [number]);

    const number1 = swap ? previousNumber : currentNumber;
    const number2 = !swap ? previousNumber : currentNumber;

    const animation1 = swap ? 'fold' : 'unfold';
    const animation2 = !swap ? 'fold' : 'unfold';

    return (<div className="flip-clock__unit-container">
            <div className="flip-clock__unit">
                <div className="flip-clock__unit__hole flip-clock__unit__hole--left"></div>
                <div className="flip-clock__unit__hole flip-clock__unit__hole--right"></div>
                <div className="flip-clock__unit__bar"></div>
                <StaticCard position={'upper'} number={currentNumber}/>
                <StaticCard position={'lower'} number={previousNumber}/>
                <AnimationCard number={number1} animation={animation1}/>
                <AnimationCard number={number2} animation={animation2}/>
            </div>
            <div className="flip-clock__unit-shadow"></div>
            <p className="flip-clock__unit-name t-unit-name">{unit}</p>
        </div>);
}

function App() {

    const [tokenData, setTokenData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenTimesResponse = await fetch("https://fantasy-api-delta.vercel.app/api/tokenTimes", {
                    method: "GET", headers: {
                        "Content-Type": "application/json",
                    },
                });

                const tokenTimesData = await tokenTimesResponse.json();
                const tokenTimesObject = tokenTimesData.reduce((acc, item) => {
                    acc[item] = ""
                    return acc;
                },{})
                setTokenData(tokenTimesObject);


                const tokensExpiredResponse = await fetch("https://fantasy-api-delta.vercel.app/api/tokensExpired", {
                    method: "GET", headers: {
                        "Content-Type": "application/json",
                    },
                });

                const tokensExpiredData = await tokensExpiredResponse.json();

                const tokensExpiredObject = tokensExpiredData.reduce((acc, item) => {
                    acc[item.time] = item.tokenId;
                    return acc;
                }, {});

                setTokenData((prev) => {
                    if (tokensExpiredObject === undefined || tokensExpiredObject === null || Object.keys(tokensExpiredObject).length === 0) {
                        return prev;
                    }
                    if (prev === undefined || prev === null || Object.keys(prev).length === 0) {
                        return {};
                    }


                    return {
                        ...prev, ...tokensExpiredObject,
                    };
                })

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, []);


    useEffect(() => {
        console.log(tokenData)
    }, [tokenData]);

    const getNextMidnight = () => {
        const now = dayjs();
        return now.hour() < 12 ? now.hour(0).minute(0).second(0).millisecond(0).add(12, 'hour').toDate() : now.hour(12).minute(0).second(0).millisecond(0).add(1, 'day').toDate();
    };


    const countFromDate = getNextMidnight();

    const Completionist = () => <span>Time’s up!</span>;

    const renderer = ({hours, minutes, seconds, completed}) => {
        if (completed) return <Completionist/>;
        return <FlipClock hours={hours} minutes={minutes} seconds={seconds}/>;
    };

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    return (<div className="App">
            <Header/>
            <header className="header">
                <h1 className="t-heading">Time Remaining</h1>
            </header>
            <Countdown date={countFromDate} renderer={renderer}/>
            <ResultTable data={tokenData}/>
            <Button isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen}/>
            <Overlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
                <h2 style={{margin: '30px auto', fontSize: '30px'}}>History</h2>
                <p style={{fontSize: '15px'}}>Enter Date to see the history</p>
                <DatePicker/>
            </Overlay>
        </div>);
}

export default App;

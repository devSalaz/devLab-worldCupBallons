import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import CanvasComponent from "./components/CanvasComponent";
import { addEffect } from "@react-three/fiber";
import { countriesData } from "./utils/data";
import "./App.css";
import "./styles/cursorPointerStyles.css";

function App() {
  const pointerRef = useRef(null);
  const textRef = useRef(null);
  const lerped1 = useRef(null);
  const lerped2 = useRef(null);
  const lerped3 = useRef(null);
  const flagEmojiRef = useRef(null);
  const doorLeftRef = useRef(null);
  const doorRightRef = useRef(null);
  const [countriesState, setCountriesState] = useState(countriesData);
  const [currentCountry, setCurrentCountry] = useState(countriesState[0]);
  const [isTeamChoosed, setTeamChoosed] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentEmojiUrl, setCurrentEmojiUrl] = useState("");
  const [currentBackground, setCurrentBackground] = useState("");
  const [showScene, setShowScene] = useState(false);
  const [mouseData] = useState({ x: 0, y: 0 });
  const [teamSelected, setTeamSelected] = useState(false);

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  const onMouseMoveHandler = (event) => {
    mouseData.x = event.clientX;
    mouseData.y = event.clientY;
    pointerRef.current.style.transform = `translate3d(calc(${mouseData.x}px - 50%), calc(${mouseData.y}px - 50%), 0)`;
    const currentX = pointerRef.current.getBoundingClientRect().x;
    const currentY = pointerRef.current.getBoundingClientRect().y;
  };

  const updateLerped = (element, lerpedValue) => {
    const currentX =
      element.getBoundingClientRect().x +
      element.getBoundingClientRect().width / 2;
    const currentY =
      element.getBoundingClientRect().y +
      element.getBoundingClientRect().height / 2;
    const xValue = lerp(currentX, mouseData.x, lerpedValue);
    const yValue = lerp(currentY, mouseData.y, lerpedValue);
    element.style.transform = `translate3d(calc(${xValue}px - 50%), calc(${yValue}px - 50%), 0)`;
  };

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      updateLerped(lerped1.current, 0.15);
      updateLerped(lerped2.current, 0.125);
      updateLerped(lerped3.current, 0.1);
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  useEffect(() => {
    gsap.to(textRef.current, {
      duration: 0.95,
      webkitMaskPositionX: "1000px",
      ease: "linear",
      onComplete() {
        setCurrentText(`${currentCountry.teamName} ready for qatar 2022`);
        setCurrentEmojiUrl(`./emojis/${currentCountry.teamEmoji}.png`);
        setCurrentBackground(currentCountry.gradientColor);
      },
    });
    gsap.to(textRef.current, {
      duration: 1.0,
      webkitMaskPositionX: "0px",
      ease: "linear",
      delay: 1.2,
    });
  }, [currentCountry]);

  useEffect(() => {
    if (isTeamChoosed) {
      gsap.to(doorLeftRef.current, {
        translateX: "0px",
        duration: 0.4,
        ease: "easeOut",
      });
      gsap.to(doorRightRef.current, {
        translateX: "0px",
        duration: 0.4,
        ease: "easeOut",
        onComplete() {
          window.setTimeout(function () {
            setShowScene(true);
          }, 1000);
        },
      });
    }
  }, [isTeamChoosed]);

  useEffect(() => {
    if (showScene) {
      window.setTimeout(function () {
        gsap.to(doorLeftRef.current, {
          translateX: "-100%",
          duration: 1,
          ease: "easeOut",
        });
        gsap.to(doorRightRef.current, {
          translateX: "100%",
          duration: 1,
          ease: "easeOut",
        });
      }, 1000);
    }
  }, [showScene]);

  return (
    <div className="App" onMouseMove={onMouseMoveHandler}>
      <div className="flagDoorContainer">
        <div
          ref={doorLeftRef}
          className="doorLeft"
          style={{
            backgroundImage: `url("./flagComplete/${currentCountry.flagName}Left.jpg")`,
          }}
        ></div>
        <div
          ref={doorRightRef}
          className="doorRight"
          style={{
            backgroundImage: `url("./flagComplete/${currentCountry.flagName}Right.jpg")`,
          }}
        ></div>
      </div>
      <div className="user-ui">
        <div className="content">
          <div className="textContent" ref={textRef}>
            <h2
              ref={textRef}
              style={{
                background: currentBackground,
              }}
            >
              {teamSelected ? (
                <>{currentText}</>
              ) : (
                <>Tap on tv and choose your team</>
              )}
            </h2>
            <img
              ref={flagEmojiRef}
              className="flagEmoji"
              src={currentEmojiUrl}
            />
          </div>
        </div>
      </div>
      <div ref={pointerRef} className="cursorPointer"></div>
      <div
        ref={lerped1}
        style={{ backgroundColor: `${currentCountry.pointerColor1}` }}
        className="pointerLerped pointerLerped1"
      ></div>
      <div
        ref={lerped2}
        style={{ backgroundColor: `${currentCountry.pointerColor2}` }}
        className="pointerLerped pointerLerped2"
      ></div>
      <div
        ref={lerped3}
        style={{ backgroundColor: `${currentCountry.pointerColor3}` }}
        className="pointerLerped pointerLerped3"
      ></div>
      <CanvasComponent
        countriesState={countriesState}
        currentCountry={currentCountry}
        setCurrentCountry={setCurrentCountry}
        isTeamChoosed={isTeamChoosed}
        setTeamChoosed={setTeamChoosed}
        showScene={showScene}
        teamSelected={teamSelected}
        setTeamSelected={setTeamSelected}
      />
    </div>
  );
}

export default App;

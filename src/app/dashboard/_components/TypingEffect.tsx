import { useState, useEffect } from 'react';

const TypingEffect = ({
  arrOfText = [""],
  typingSpeed = 100,
  pauseDelay = 1500,
  eraseSpeed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const currentText:string = arrOfText[textIndex] ?? "";

    if (isTyping) {
      if (charIndex < currentText.length) {
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev + currentText[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setIsTyping(false), pauseDelay);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        }, eraseSpeed);
      } else {
        setIsTyping(true);
        setTextIndex((prev) => (prev + 1) % arrOfText.length);
      }
    }

    return () => clearTimeout(timer);
  }, [arrOfText, charIndex, isTyping, textIndex, typingSpeed, eraseSpeed, pauseDelay]);

  return displayedText;
};

export default TypingEffect;
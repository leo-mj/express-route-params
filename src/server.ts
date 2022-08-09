import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get("/echo/:exampleRouteParameter", (req, res) => {
  const echoContent = req.params.exampleRouteParameter;
  res.json({
    echo: echoContent,
    message: `I am echoing back to you: ${echoContent}`,
  });
});

app.get("/multiply/:numOne/:numTwo", (req, res) => {
  /**
   * Note that `numOne` and `numTwo` are both typed as string.
   * (Hover over with your mouse to see!)
   *
   * Route params are, by default, typed as strings when they
   * are parsed by Express.
   */
  const { numOne, numTwo } = req.params;
  const multiplication = parseInt(numOne) * parseInt(numTwo);
  res.json({
    original: `${numOne} x ${numTwo}`,
    result: multiplication,
  });
});

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

app.get<{ phrase: string }>("/shout/:phrase", (req, res) => {
  res.json({
    shout: req.params.phrase.toUpperCase(),
    result: `I am shouting back to you: ${req.params.phrase.toUpperCase()}!`,
  });
});

app.get("/add/:num1/:num2", (req, res) => {
  res.json({
    original: `${req.params.num1} + ${req.params.num2}`,
    result: parseInt(req.params.num1) + parseInt(req.params.num2),
  });
});

app.get<{ food: string }>("/eat/:food", (req, res) => {
  const vowels: string[] = ["a", "e", "i", "o", "u"];
  const firstLetter: string = req.params.food[0].toLowerCase();
  const startsWithVowel: boolean = vowels.includes(firstLetter);
  res.json({
    message: `Yum yum - you ate ${
      (startsWithVowel && "an " + req.params.food.toLowerCase()) ||
      "a " + req.params.food.toLowerCase()
    }`,
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});


export async function AboutLoader() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("about fake delay delay");
  return null;
}

const About = () => {
  return (
    <div>About fake delay delay to see the loading animation</div>
  )
}
export default About
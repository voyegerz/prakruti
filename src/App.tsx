import "./App.css";
import Sidebar from "./Components/Sidebar";
import {
  fetchAssessmentQuestions,
  processAssessmentResults,
  fetchUserResponse,
  calculatePercentages,
} from "./Utils/Api";

type ask_ob = {
  options: string[] | string;
  questions: string[] | string;
};

function App() {
  /**************************************checking the working of the api services******************************************** */
  async function a(): Promise<void> {
    var data: any = await fetchAssessmentQuestions();
    console.log(data);

    const result: string[] = [];
    for (var i = 0; i < 20; i++) {
      var data2 = await processAssessmentResults(
        `${data.questions[i]} ${data.options[i]}`
      );
      result.push(data2);
    }
    console.log(result);

    var data3 = await fetchUserResponse("How can i benefit from ayurveda ?");
    console.log("Bot Response :" + data3);

    var percentage = calculatePercentages(result);
    console.log(percentage);
  }
  a();

  return (
    <>
      <Sidebar />
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import axios from "axios";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
interface FetchDataResponse {
  allQuestion: Question[];
}

const useFetchData = (stop: boolean):FetchDataResponse => {
  const [allQuestion, setAllQuestion] = useState<Question[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=15&type=multiple"
        );
        setAllQuestion(response.data.results);
      } catch (error) {
        console.log(error);
        
      }
    };

    if (stop) {
      fetchData(); 
    }
  }, [stop]);

  useEffect(() => {
    if(!stop) {
      const fetchDataOnMount = async () => {
        try {
          const response = await axios.get(
            "https://opentdb.com/api.php?amount=15&type=multiple"
          );
          setAllQuestion(response.data.results);
        } catch (error) {
          console.log(error);
          
        }
      };
    
        fetchDataOnMount(); 
    }
    }, []); 

  return {allQuestion};
};



export default useFetchData;

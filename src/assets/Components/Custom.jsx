import { useEffect,useState } from "react";




const Custom = ({type,msg,removeAlert}) => {
    const [progress, setProgress] = useState(100);

    useEffect(()=>{const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1; 
        });
      }, 30);


        const timeout = setTimeout(()=>{
       removeAlert()
        },3000)

        return ()=>{clearTimeout(timeout);
            clearInterval(interval)
        }
    },[removeAlert])
    return(
    <>
     <p className={`alert alert-${type}`}>{msg}
     <div style={{ width: '280px', backgroundColor: 'white', borderRadius: '5px', overflow: 'hidden' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '5px',
          backgroundColor:type ==='success'?'green':'red',
          transition: 'width 0.5s ease',
          marginTop:'20px',
        }}
      />
    </div>
     </p>
     
     </>
    )
};




   
    


export default Custom
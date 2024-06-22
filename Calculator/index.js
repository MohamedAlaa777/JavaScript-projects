let calculator=
{
    InputText:document.getElementById("txtInput"),
    FirstValue:null,
    Operator:0,
    NewOperation:true,
    CurrentValues:[],
    WriteText:function(bottun){
        if(calculator.InputText.value!==""&& this.NewOperation===false)
        {
            calculator.InputText.value=bottun.value;
            this.NewOperation=true;
            return
        }
        this.InputText.value+=bottun.value;
    },
    OperatorClick:function(CurrentOperator){
        if(calculator.InputText.value==="")
        {
            alert("please enter first value")
            return
        }
        this.FirstValue=parseFloat(calculator.InputText.value)
        calculator.InputText.value=""
        this.Operator=CurrentOperator
    },
    calculation:function()
    {
        if(this.FirstValue===null)
        {
            alert("please enter first value")
            return
        }
        if(calculator.InputText.value==="")
        {
            alert("please enter second value")
            return
        }
        let newValue=parseFloat(calculator.InputText.value)
        let result=0;
        switch(this.Operator)
        {
            case '1':
                result=this.FirstValue+newValue
                break
            case '2':
                result=this.FirstValue-newValue
                break
            case '3':
                result=this.FirstValue*newValue
                break
            case '4':
                result=this.FirstValue/newValue
                break            
        }
        calculator.InputText.value=result;
        this.CurrentValues.push(result);
        console.log(this.CurrentValues);
        let valueInScreen=document.getElementById("DivValues")
        valueInScreen.innerHTML="";
        for(let i=0;i<this.CurrentValues.length;i++)
        {
            // innerHTML it inject html code
            valueInScreen.innerHTML+="<li>"+this.CurrentValues[i]+"</li>"
        }
        
        
        // we clear the input after press equal
        this.FirstValue=null;
        this.Operator=0;
        this.NewOperation=false;
    },
    ClearData:function()
    {
        this.InputText.value=""
        this.FirstValue=null
        this.Operator=0
        this.NewOperation=false
    }
}
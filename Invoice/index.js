class sales
{
    constructor()
    {
        this.salesMan="ahmed"
    }
}

class Invoice extends sales
{
    constructor()
    {
        super("ahmed")
        this.id=5
        this.name="ali"
        this.InvoiceData={} 
        this.ItemArr=[]
    }

    CollectData()
    {
        let invoiceNumber=document.getElementById("txtInvoiceNumber")
        let invoiceDate=document.getElementById("txtInvoiceDate")
        let delivaryMan=document.getElementById("ddlMan")
        let notes=document.getElementById("txtNotes")
        this.InvoiceData=
        {
            InvoiceNumber:invoiceNumber.value,
            InvoiceDate:invoiceDate.value,
            DelivaryMan:delivaryMan.options[delivaryMan.selectedIndex].innerText,
            Notes:notes.value,
            itemArr:this.ItemArr
        }

        // JSON=javascript object notation
        let jssonInvoice=JSON.stringify(this.InvoiceData)
        
        console.log(this.InvoiceData)
    }

    AddTtem()
    {
        let itemName=document.getElementById("txtItemName")
        let price=document.getElementById("txtItemPrice")
        let qty=document.getElementById("txtQty")
        this.InvoiceItem=
        {
            ItemName:itemName.value,
            Price:price.value,
            Qty:qty.value
        }
        // Array to save objects
        this.ItemArr.push(this.InvoiceItem)
        this.ShowData()
    }

    ShowData()
    {
        let tBody=document.getElementById("TableBody")
        tBody.innerHTML=""
        let htmlData=""
        this.ItemArr.forEach(function(value,index)
        {
            htmlData+="<tr><td>"+value.ItemName+"</td>";
            htmlData+="<td>"+value.Qty+"</td>";
            htmlData+="<td>"+value.Price+"</td>";                                //atribut(data atribute)=> you must write by small litters as (itemid)
            htmlData+="<td><input type='button' class='btn btn-danger deleteItem' data-itemid='"+value.ItemName+"' value='Delete'></td></tr>";
        })
        tBody.innerHTML=htmlData

        // Delete

        let deleteButtons=document.getElementsByClassName("deleteItem")
        // we use new object with old data (not new empty object)
        let myInvoice=this
        for(let i=0;i<deleteButtons.length;i++)
        {
            console.log(deleteButtons[i].dataset.itemid)
            deleteButtons[i].addEventListener("click",function()
        {
        myInvoice.Delete(deleteButtons[i])
        })
}    
    }
    Delete(btn)
    {
        myInvoice.ItemArr.forEach(function(value,index)
        {
            console.log(btn.dataset.itemid)
            console.log(value)
            if(value.ItemName===btn.dataset.itemid)
            {
                myInvoice.ItemArr.splice(index,1)
                return;
            }
        })
        btn.parentNode.parentNode.remove();
    }
}


let myInvoice=new Invoice()
console.log(myInvoice.id)
myInvoice.CollectData()

document.getElementById("btnSave").addEventListener("click",function()
{
    myInvoice.CollectData()
})
document.getElementById("btnAddItem").addEventListener("click",function()
{
    myInvoice.AddTtem()
})

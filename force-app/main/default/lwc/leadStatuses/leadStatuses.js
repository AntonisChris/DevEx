import { LightningElement, wire } from "lwc";
import getAllLeadsAndStatuses from "@salesforce/apex/leadStatusesController.getAllLeadsAndStatuses";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LeadStatuses extends LightningElement {
  leads;

  @wire(getAllLeadsAndStatuses)
  handleLeads({ error, data }) {
    if (data) {
      this.leads = data.map((lead) => ({
        Id: lead.Id,
        Name: lead.Name,
        Status: lead.Lead_Statuses__r[0].Status__c
      }));
      console.log(data);
    } else if (error) {
      console.log(error);
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error loading Leads",
          message: error.body.message,
          variant: "error"
        })
      );
    }
  }

  columns = [
    { label: "Name", fieldName: "Name" },
    { label: "Status", fieldName: "Status" }
  ];
}

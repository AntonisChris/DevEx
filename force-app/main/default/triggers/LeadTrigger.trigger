trigger LeadTrigger on Lead(before insert, before update) {
  for (Lead l : Trigger.new) {
    if (l.Score__c > Integer.valueof(System.Label.Lead_Qualified_Threshold)) {
      l.Status = 'Qualified';
    }
  }
}

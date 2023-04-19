public class leadStatusesController {
  @AuraEnabled(cacheable=true)
  public static List<Lead> getAllLeadsAndStatuses() {
    // throw new AuraHandledException('exceptionText');
    return [
      SELECT Id, Name, Status, (SELECT id, status__c FROM Lead_Statuses__r)
      FROM Lead
    ];
  }
}

export class SessionPlan {
    constructor(title, topic, level, duration, description, notes) {
        this.id = 'plan_' + Date.now();
        this.title = title;
        this.topic = topic;
        this.level = level;  
        this.duration = duration;  
        this.description = description;
        this.inclusionNotes = notes;
        this.syncStatus = 'saved_locally'; 
        this.createdAt = new Date().toISOString();
        
        st
        this.pupilNames = undefined; 
        this.pupilProfiles = undefined;
    }
}
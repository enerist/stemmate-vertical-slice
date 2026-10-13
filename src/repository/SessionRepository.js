export class SessionRepository {
    constructor() {
        this.storageKey = 'stemmate_offline_plans';
    }

    
    getAllLocalPlans() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    
    saveLocally(sessionPlan) {
        const currentPlans = this.getAllLocalPlans();
        sessionPlan.syncStatus = 'saved_locally';
        currentPlans.push(sessionPlan);
        localStorage.setItem(this.storageKey, JSON.stringify(currentPlans));
        return { success: true, status: 'saved_locally', data: sessionPlan };
    }

    
    async synchronizeWithServer(sessionPlan) {
        if (!navigator.onLine) {
            // Failure Flow: Save locally and trigger graceful error UI fallbac
            return this.saveLocally(sessionPlan);
        }

        try {
            
            sessionPlan.syncStatus = 'synchronized';
            return { success: true, status: 'synchronized', data: sessionPlan };
        } catch (error) {
            // Recovery Flow: If server fails unexpectedly, drop safely back to local storage
            return this.saveLocally(sessionPlan);
        }
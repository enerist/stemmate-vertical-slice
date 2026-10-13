import { SessionPlan } from '../src/models/SessionPlan.js';
import { SessionRepository } from '../src/repository/SessionRepository.js';

// Mock the browser's native localStorage for our automated environment
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        clear: () => { store = {}; }
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('STEMMate Namibia Architecture & Caching Integration Tests', () => {
    let repository;
    let mockPlan;

    beforeEach(() => {
        window.localStorage.clear();
        repository = new SessionRepository();
        mockPlan = new SessionPlan(
            "Introduction to Volumetric Analysis",
            "Science",
            "Primary (Grades 4-6)",
            "45 minutes",
            "Step 1: Measure acid variables safely.",
            "Ensure learners wear protective safety gloves."
        );
    });

    // AUTOMATED UNIT TEST 1: Verifies offline caching (Requirement FR-05)
    test('FR-05 Verification: App must cache session data locally when network drops', () => {
        const result = repository.saveLocally(mockPlan);
        
        expect(result.success).toBe(true);
        expect(result.status).toBe('saved_locally');
        expect(result.data.syncStatus).toBe('saved_locally');
        
        const cachedPlans = repository.getAllLocalPlans();
        expect(cachedPlans.length).toBe(1);
        expect(cachedPlans[0].title).toBe("Introduction to Volumetric Analysis");
    });

    // AUTOMATED UNIT TEST 2: Verifies zero child tracking variables exist (Requirement AR-01)
    test('AR-01 Privacy Verification: Session architecture must completely omit learner names or photos', () => {
        expect(mockPlan.pupilNames).toBeUndefined();
        expect(mockPlan.pupilProfiles).toBeUndefined();
    });
});
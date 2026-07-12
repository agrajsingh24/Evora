// src/services/aiServices.js

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export async function analyzeCivicIssue(imageFile, description, location) {
    let base64Data = "";
    
    try {
        // 1. Convert Image to raw Base64 Data
        base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(imageFile);
        });

        if (!apiKey) {
            console.warn("⚠️ API Key missing. Falling back to Mock Analysis.");
            return mockAnalysis(base64Data, description, location);
        }

        // THE RULES ENGINE (Built directly from your 12,000 row CSV!)
        const prompt = `
            You are an expert civic infrastructure analyst. Analyze this image and complaint.

            Complaint: "${description}"

            CRITICAL CLASSIFICATION RULE: You MUST classify the issue into one of these exact categories and assign its corresponding department:
            1. "Waste Management" -> "Municipal Corporation – Solid Waste Department"
            2. "Road Infrastructure" -> "Public Works Department (PWD)"
            3. "Water Supply" -> "Jal Nigam / Municipal Water Department"
            4. "Sewerage" -> "Municipal Drainage / Sewerage Department"
            5. "Street Lighting" -> "Municipal Electrical Department"
            6. "Traffic" -> "Traffic Police / Transport Department"
            7. "Environmental Pollution" -> "State Pollution Control Board"
            8. "Animal Welfare" -> "Municipal Animal Control / Animal Welfare Board"
            9. "Encroachment" -> "Urban Development Authority / Municipal Corporation"
            10. "Parks & Green Spaces" -> "Municipal Horticulture / Parks Department"
            11. "Disaster Risk" -> "Disaster Management Authority"
            12. "Public Health" -> "Municipal Health Department"

            Provide comprehensive analysis in this exact JSON format with ALL fields filled:
            {
              "detected_category": "MUST BE EXACTLY ONE OF THE 12 CATEGORIES LISTED ABOVE",
              "confidence": 0.95,
              "severity": 85,
              "description": "Clear, detailed description of the civic issue visible in the image",
              "measurements": {
                "affected_area_square_meters": 8.0
              },
              "health_risks": ["mosquito breeding", "disease transmission", "accident risk"],
              "urgency_level": "high",
              "expected_resolution_time_hours": 24,
              "assigned_department": "MUST BE EXACTLY THE CORRESPONDING DEPARTMENT FROM THE LIST ABOVE",
              "possible_cause": "Short string explaining likely cause",
              "next_steps": ["Deploy repair team", "Set up warning signs"],
              "auto_escalate": false,
              "escalation_reason": null,
              "work_order": {
                "priority": "high",
                "estimated_workers": 3,
                "required_equipment": ["Equipment 1", "Equipment 2"],
                "safety_precautions": ["warning signs", "traffic control"],
                "estimated_cost_inr": 15000,
                "estimated_duration_hours": 6
              },
              "root_cause_analysis": {
                "primary_cause": "Poor drainage system",
                "contributing_factors": ["Heavy monsoon", "Aging infrastructure"],
                "recurring_issue": true,
                "prevention_measures": ["Improve drainage", "Regular inspections"],
                "similar_issues_in_area": 3
              },
              "municipal_staff_instructions": {
                "immediate_actions": ["Deploy team within 2 hours"],
                "location_based_route": "Via nearest municipal office",
                "tools_checklist": ["Repair kit", "Safety gear"],
                "completion_verification": ["Photo documentation", "Quality check"]
              },
              "health_hazard_predictions": {
                "mosquito_breeding_risk": "medium",
                "contamination_risk": "low",
                "accident_risk": "high",
                "crime_risk_due_to_darkness": "low",
                "overall_risk_score": 70
              }
            }
        `;

        // 3. RAW REST API Call to Google (Bypassing SDK)
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: prompt },
                            { inline_data: { mime_type: imageFile.type, data: base64Data } }
                        ]
                    }],
                    safetySettings: [
                        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                    ],
                    generationConfig: { responseMimeType: "application/json" }
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.warn("🚨 Google API Error, triggering fallback mock:", data);
            return mockAnalysis(base64Data, description, location);
        }

        const responseText = data.candidates[0].content.parts[0].text;
        const aiAnalysis = JSON.parse(responseText);

        return formatFinalResponse(aiAnalysis, false);

    } catch (error) {
        console.warn("⚠️ AI Service Failed. Triggering Fallback Mock.", error);
        return mockAnalysis(base64Data, description, location);
    }
}


// ==========================================
// 🚨 THE FAIL-SAFE MOCKING SYSTEM
// Updated to match your CSV Dataset exactly!
// ==========================================

function formatFinalResponse(aiAnalysis, isMock) {
    // Map your 12 detailed categories down to the 5 colors for the Heatmap UI
    let mapCategory = "Infrastructure";
    const cat = (aiAnalysis.detected_category || "").toLowerCase();
    
    if (cat.includes("waste") || cat.includes("animal") || cat.includes("public health")) mapCategory = "Waste";
    if (cat.includes("water") || cat.includes("sewerage")) mapCategory = "Water";
    if (cat.includes("pollution")) mapCategory = "Air";
    if (cat.includes("parks") || cat.includes("green")) mapCategory = "Deforestation";

    return {
        predicted_category: aiAnalysis.detected_category || "Other",
        admin_map_category: mapCategory, // Used for Map Filters
        category_confidence: aiAnalysis.confidence || 0.85,
        final_severity: aiAnalysis.severity || 50,
        severity_level: getSeverityLevel(aiAnalysis.severity || 50),
        description: aiAnalysis.description,
        measurements: aiAnalysis.measurements || {},
        health_risks: aiAnalysis.health_risks || [],
        urgency_level: aiAnalysis.urgency_level || "medium",
        expected_resolution_time: `${aiAnalysis.expected_resolution_time_hours || 24} hours`,
        assigned_department: aiAnalysis.assigned_department || "Municipal Corporation",
        possible_cause: aiAnalysis.possible_cause || "Unknown",
        next_steps: aiAnalysis.next_steps || [],
        auto_escalate: aiAnalysis.auto_escalate || false,
        escalation_reason: aiAnalysis.escalation_reason,
        work_order: aiAnalysis.work_order || {},
        root_cause_analysis: aiAnalysis.root_cause_analysis || {},
        municipal_staff_instructions: aiAnalysis.municipal_staff_instructions || {},
        health_hazard_predictions: aiAnalysis.health_hazard_predictions || {},
        needs_human_review: (aiAnalysis.confidence || 1) < 0.7 || (aiAnalysis.severity || 50) > 85,
        gemini_raw: isMock ? { note: "Mock analysis active" } : aiAnalysis
    };
}

function mockAnalysis(imageBase64, complaintText, location) {
    const category = determineCategoryFromText(complaintText);
    const severity = 50 + Math.floor(Math.random() * 40);
    const confidence = 0.75 + Math.random() * 0.2;

    const mockData = {
        detected_category: category,
        confidence: confidence,
        severity: severity,
        description: `Visual detection identifies ${category}. ${complaintText.slice(0, 100)}`,
        health_risks: ["Accident Risk", "Public Health Concern"],
        urgency_level: severity > 75 ? "high" : severity > 50 ? "medium" : "low",
        expected_resolution_time_hours: severity > 75 ? 12 : severity > 50 ? 24 : 48,
        assigned_department: getDepartmentForCategory(category),
        possible_cause: "Environmental wear and tear or inadequate maintenance.",
        next_steps: ["Dispatch inspection team", "Secure area"],
        auto_escalate: severity > 85,
        escalation_reason: severity > 85 ? "Critical severity detected" : null,
        work_order: {
            priority: severity > 75 ? "high" : severity > 50 ? "medium" : "low",
            estimated_workers: 3,
            required_equipment: ["Standard municipal toolkit", "Safety gear"],
            safety_precautions: ["Warning signs", "Traffic diversion"],
            estimated_cost_inr: severity > 75 ? 25000 : 15000,
            estimated_duration_hours: 6,
        },
        root_cause_analysis: {
            primary_cause: "Infrastructure aging or extreme weather",
            contributing_factors: ["High usage", "Delayed reporting"],
            recurring_issue: Math.random() > 0.5,
            prevention_measures: ["Regular audits", "Faster response times"],
            similar_issues_in_area: Math.floor(Math.random() * 5),
        },
        municipal_staff_instructions: {
            immediate_actions: ["Assess site safety"],
            location_based_route: `Via nearest municipal office`,
            tools_checklist: ["Safety gear", "Inspection tablet"],
            completion_verification: ["Photo documentation", "Update ticket"],
        },
        health_hazard_predictions: {
            overall_risk_score: severity,
        }
    };

    return formatFinalResponse(mockData, true);
}

// --- Helper Functions mapped to your CSV ---

function determineCategoryFromText(text) {
    const t = text.toLowerCase();
    if (t.includes("garbage") || t.includes("waste") || t.includes("trash")) return "Waste Management";
    if (t.includes("road") || t.includes("pothole") || t.includes("broken")) return "Road Infrastructure";
    if (t.includes("water") || t.includes("pipe") || t.includes("leak")) return "Water Supply";
    if (t.includes("sewer") || t.includes("drain") || t.includes("flood")) return "Sewerage";
    if (t.includes("light") || t.includes("dark") || t.includes("bulb")) return "Street Lighting";
    if (t.includes("traffic") || t.includes("signal") || t.includes("jam")) return "Traffic";
    if (t.includes("pollution") || t.includes("smoke") || t.includes("dust")) return "Environmental Pollution";
    if (t.includes("animal") || t.includes("dog") || t.includes("cow")) return "Animal Welfare";
    if (t.includes("encroach") || t.includes("illegal") || t.includes("occupy")) return "Encroachment";
    if (t.includes("park") || t.includes("tree") || t.includes("grass")) return "Parks & Green Spaces";
    if (t.includes("disaster") || t.includes("landslide") || t.includes("collapse")) return "Disaster Risk";
    return "Public Health";
}

function getSeverityLevel(score) {
    if (score >= 85) return "critical";
    if (score >= 65) return "high";
    if (score >= 40) return "medium";
    return "low";
}

function getDepartmentForCategory(category) {
    const deptMap = {
        "Waste Management": "Municipal Corporation – Solid Waste Department",
        "Road Infrastructure": "Public Works Department (PWD)",
        "Water Supply": "Jal Nigam / Municipal Water Department",
        "Sewerage": "Municipal Drainage / Sewerage Department",
        "Street Lighting": "Municipal Electrical Department",
        "Traffic": "Traffic Police / Transport Department",
        "Environmental Pollution": "State Pollution Control Board",
        "Animal Welfare": "Municipal Animal Control / Animal Welfare Board",
        "Encroachment": "Urban Development Authority / Municipal Corporation",
        "Parks & Green Spaces": "Municipal Horticulture / Parks Department",
        "Disaster Risk": "Disaster Management Authority",
        "Public Health": "Municipal Health Department"
    };
    return deptMap[category] || "Municipal Corporation";
}
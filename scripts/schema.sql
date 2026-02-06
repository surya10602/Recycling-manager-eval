-- Create the database
CREATE DATABASE IF NOT EXISTS recycling_manager_db;
USE recycling_manager_db;

-- Table: Candidates
-- Stores basic profile information including experience and skills [cite: 12]
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    years_of_experience INT NOT NULL,
    skills JSON, -- Storing skills as a JSON array for flexibility
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Evaluations
-- Stores AI-generated scores for specific competencies [cite: 13]
CREATE TABLE evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    crisis_management_score DECIMAL(5, 2),
    sustainability_knowledge_score DECIMAL(5, 2),
    team_motivation_score DECIMAL(5, 2),
    ai_feedback_summary TEXT,
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- Table: Rankings
-- Auto-updated rankings based on weighted evaluation scores [cite: 14]
CREATE TABLE rankings (
    candidate_id INT PRIMARY KEY,
    total_score DECIMAL(5, 2),
    rank_position INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- Index for faster retrieval of top candidates
CREATE INDEX idx_ranking_score ON rankings(total_score DESC);
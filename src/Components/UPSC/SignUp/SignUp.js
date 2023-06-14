import React, { useState } from "react";
import styles from "../../../styles/upsc/signUp.module.css";
import { useRouter } from "next/router";

function SignUp() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [medium, setMedium] = useState("");
  const router = useRouter();

  // Function to validate form fields
  const validateField = (value, regex, errorMessage) => {
    if (value === "") {
      alert(`Please enter your ${errorMessage.toLowerCase()}.`);
      return false;
    }
    if (!regex.test(value)) {
      alert(`Please enter a valid ${errorMessage.toLowerCase()}.`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !validateField(name, /.+/, "Name") || // The /.+/ regex checks for any non-empty string
      !validateField(number, /^\d{10,15}$/, "Mobile number") ||
      !validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email address") ||
      !validateField(medium, /.+/, "Medium of exam") // The /.+/ regex checks for any non-empty string
    ) {
      return;
    }

    const formData = {
      name,
      number,
      email,
      medium,
    };

    try {
      const response = await fetch("http://34.93.138.253/api/v1/quiz/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.student_id) {
          router.push({
            pathname: `/scholarships/quiz`,
            query: { studentId: data.student_id },
          });
        }
      } else {
        console.error("API call failed");
        // Handle error
      }
    } catch (error) {
      console.error("API call failed:", error);
      // Handle error
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <a href="#" className={styles.header}>
          Fill in Your Details to Begin the Prelims Preparation Test
        </a>
        <div className={styles.formCard}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <FormInput
                type="text"
                label="Your Name"
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormInput
                type="tel"
                label="Phone Number"
                id="phoneNumber"
                placeholder="Your phone number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <FormInput
                type="email"
                label="Email ID"
                id="email"
                placeholder="Your email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormSelect
                label="UPSC Exam Language/Medium"
                id="language"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
              >
                <option value="">Choose a language</option>
                <option value="ENG">English</option>
                <option value="HI">Hindi</option>
              </FormSelect>
              <button type="submit"
                className={styles.submitButton}
              >
                Start Test Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const FormInput = ({ type, label, id, placeholder, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const FormSelect = ({ label, id, value, onChange, children }) => {
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className={styles.input}
      >
        {children}
      </select>
    </div>
  );
};

export default SignUp;

import React, { useMemo, useState } from 'react';
import '../styles/pages/FeedbackPage.css';

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  audience: '',
  category: '',
  service: '',
  rating: '',
  subject: '',
  message: '',
  responseRequested: false,
  consent: false,
};

const audienceOptions = [
  'Researcher',
  'Innovator or startup',
  'Student',
  'Government institution',
  'Private sector',
  'Development partner',
  'Citizen',
  'Other',
];

const categoryOptions = [
  'Website content',
  'Online service experience',
  'Research and innovation support',
  'Funding or grants information',
  'Publications and documents',
  'Accessibility issue',
  'Complaint',
  'Compliment',
  'Suggestion',
];

const serviceOptions = [
  'General COSTECH website',
  'Research clearance',
  'Funding opportunities',
  'Innovation spaces',
  'Publications',
  'Events',
  'Dashboard or information portal',
  'Contact and support',
  'Other',
];

const ratingOptions = [
  'Excellent',
  'Good',
  'Average',
  'Poor',
  'Very poor',
];

const FeedbackPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState(null);

  const referenceNumber = useMemo(() => {
    const now = new Date();
    const datePart = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('');
    return `CST-FBK-${datePart}-${Math.floor(1000 + Math.random() * 9000)}`;
  }, []);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.category) {
      nextErrors.category = 'Select a feedback category.';
    }

    if (!formData.rating) {
      nextErrors.rating = 'Select your experience rating.';
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = 'Enter a short subject.';
    }

    if (formData.message.trim().length < 20) {
      nextErrors.message = 'Share at least 20 characters so the team can understand your feedback.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (formData.responseRequested && !formData.email.trim() && !formData.phone.trim()) {
      nextErrors.responseRequested = 'Provide an email or phone number if you need a response.';
    }

    if (!formData.consent) {
      nextErrors.consent = 'Confirm that COSTECH may use this feedback for service improvement.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildEmailBody = (reference) => {
    return [
      `Reference: ${reference}`,
      `Name: ${formData.fullName || 'Not provided'}`,
      `Email: ${formData.email || 'Not provided'}`,
      `Phone: ${formData.phone || 'Not provided'}`,
      `Audience: ${formData.audience || 'Not selected'}`,
      `Category: ${formData.category}`,
      `Service area: ${formData.service || 'Not selected'}`,
      `Rating: ${formData.rating}`,
      `Response requested: ${formData.responseRequested ? 'Yes' : 'No'}`,
      '',
      'Feedback:',
      formData.message.trim(),
    ].join('\n');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submittedAt = new Date().toISOString();
    const payload = {
      reference: referenceNumber,
      submittedAt,
      ...formData,
      message: formData.message.trim(),
      subject: formData.subject.trim(),
    };

    let previousFeedback = [];
    try {
      previousFeedback = JSON.parse(localStorage.getItem('costech_feedback_submissions') || '[]');
    } catch (error) {
      previousFeedback = [];
    }
    localStorage.setItem(
      'costech_feedback_submissions',
      JSON.stringify([payload, ...previousFeedback].slice(0, 10))
    );

    const emailBody = buildEmailBody(referenceNumber);
    const mailtoUrl = `mailto:info@costech.or.tz?subject=${encodeURIComponent(
      `Website feedback: ${formData.subject.trim()}`
    )}&body=${encodeURIComponent(emailBody)}`;

    setSubmission({
      reference: referenceNumber,
      mailtoUrl,
    });

    window.location.href = mailtoUrl;
  };

  return (
    <section className="feedback-page">
      <div className="feedback-hero">
        <div className="feedback-hero-overlay" />
        <div className="feedback-hero-content">
          <p className="feedback-eyebrow">Public service feedback</p>
          <h1>Help Improve COSTECH Services</h1>
          <p>
            Share comments about website content, online services, publications,
            accessibility, or any public service experience with COSTECH.
          </p>
        </div>
      </div>

      <div className="feedback-body">
        <div className="feedback-intro">
          <div>
            <h2>Your feedback supports better service delivery</h2>
            <p>
              COSTECH welcomes suggestions, compliments, complaints, and reports
              of incorrect or missing information. Please avoid sharing
              confidential research data or sensitive personal information in
              this public website form.
            </p>
          </div>
          <aside className="feedback-service-note">
            <span>What to include</span>
            <ul>
              <li>The page, service, or document you are referring to.</li>
              <li>What happened, what should be corrected, or what could be improved.</li>
              <li>Your contact details if you would like a response.</li>
            </ul>
          </aside>
        </div>

        {submission && (
          <div className="feedback-success" role="status">
            <strong>Feedback reference: {submission.reference}</strong>
            <span>
              Your feedback has been prepared for email submission. If your email
              application did not open, use the button below.
            </span>
            <a href={submission.mailtoUrl}>Open email submission</a>
          </div>
        )}

        <form className="feedback-form" onSubmit={handleSubmit} noValidate>
          <div className="feedback-section">
            <h2>About You</h2>
            <div className="feedback-grid">
              <label>
                Full name
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={updateField}
                  placeholder="Optional"
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField}
                  placeholder="Optional"
                />
                {errors.email && <span className="feedback-error">{errors.email}</span>}
              </label>

              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={updateField}
                  placeholder="Optional"
                />
              </label>

              <label>
                I am a
                <select name="audience" value={formData.audience} onChange={updateField}>
                  <option value="">Select audience</option>
                  {audienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="feedback-section">
            <h2>Feedback Details</h2>
            <div className="feedback-grid">
              <label>
                Category <span className="feedback-required">*</span>
                <select name="category" value={formData.category} onChange={updateField}>
                  <option value="">Select category</option>
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.category && <span className="feedback-error">{errors.category}</span>}
              </label>

              <label>
                Service or page
                <select name="service" value={formData.service} onChange={updateField}>
                  <option value="">Select service area</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                Experience rating <span className="feedback-required">*</span>
                <select name="rating" value={formData.rating} onChange={updateField}>
                  <option value="">Select rating</option>
                  {ratingOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.rating && <span className="feedback-error">{errors.rating}</span>}
              </label>

              <label>
                Subject <span className="feedback-required">*</span>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={updateField}
                  placeholder="Example: Missing guideline document"
                />
                {errors.subject && <span className="feedback-error">{errors.subject}</span>}
              </label>
            </div>

            <label className="feedback-message-field">
              Your feedback <span className="feedback-required">*</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={updateField}
                rows="7"
                placeholder="Describe your feedback clearly. Include the page URL or service name where possible."
              />
              {errors.message && <span className="feedback-error">{errors.message}</span>}
            </label>
          </div>

          <div className="feedback-section feedback-consent-section">
            <label className="feedback-checkbox">
              <input
                type="checkbox"
                name="responseRequested"
                checked={formData.responseRequested}
                onChange={updateField}
              />
              I would like COSTECH to contact me about this feedback.
            </label>
            {errors.responseRequested && (
              <span className="feedback-error">{errors.responseRequested}</span>
            )}

            <label className="feedback-checkbox">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={updateField}
              />
              I confirm that COSTECH may use this feedback to improve public services and website content.
            </label>
            {errors.consent && <span className="feedback-error">{errors.consent}</span>}
          </div>

          <div className="feedback-actions">
            <button type="submit">Submit Feedback</button>
            <p>
              Feedback is sent to COSTECH by email and a local reference is kept
              in this browser for your records.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FeedbackPage;

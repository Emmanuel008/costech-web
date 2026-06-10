import React, { useMemo, useState } from 'react';
import '../styles/pages/FeedbackPage.css';

const serviceAreas = [
  'Customer service',
  'Grant Management',
  'Research Registration and Clearance',
  'Quality of our services and products',
  'Research Coordination',
  'Communication',
  'Response to issues',
];

const ratingOptions = ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'];

const createInitialRatings = () => {
  return serviceAreas.reduce((ratings, area) => ({
    ...ratings,
    [area]: '',
  }), {});
};

const initialFormState = {
  ratings: createInitialRatings(),
  remarks: '',
  completedBy: '',
  companyName: '',
  signature: '',
  date: new Date().toISOString().slice(0, 10),
};

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
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const updateRating = (area, rating) => {
    setFormData((current) => ({
      ...current,
      ratings: {
        ...current.ratings,
        [area]: rating,
      },
    }));
    setErrors((current) => ({
      ...current,
      ratings: undefined,
    }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const missingRatings = serviceAreas.filter((area) => !formData.ratings[area]);

    if (missingRatings.length > 0) {
      nextErrors.ratings = 'Please rate all service areas.';
    }

    if (!formData.completedBy.trim()) {
      nextErrors.completedBy = 'Enter your name.';
    }

    if (!formData.companyName.trim()) {
      nextErrors.companyName = 'Enter your company or business name.';
    }

    if (!formData.signature.trim()) {
      nextErrors.signature = 'Enter your name as confirmation.';
    }

    if (!formData.date) {
      nextErrors.date = 'Select the completion date.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildEmailBody = (reference) => {
    const ratings = serviceAreas
      .map((area) => `${area}: ${formData.ratings[area]}`)
      .join('\n');

    return [
      'CUSTOMER FEEDBACK FORM',
      `Reference: ${reference}`,
      '',
      'Ratings:',
      ratings,
      '',
      'Other remarks / suggestions:',
      formData.remarks.trim() || 'Not provided',
      '',
      'Completed By:',
      `Name: ${formData.completedBy.trim()}`,
      `Company / Business Name: ${formData.companyName.trim()}`,
      `Signature: ${formData.signature.trim()}`,
      `Date: ${formData.date}`,
    ].join('\n');
  };

  const saveSubmission = (payload) => {
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      reference: referenceNumber,
      submittedAt: new Date().toISOString(),
      ...formData,
      remarks: formData.remarks.trim(),
      completedBy: formData.completedBy.trim(),
      companyName: formData.companyName.trim(),
      signature: formData.signature.trim(),
    };

    saveSubmission(payload);

    const emailBody = buildEmailBody(referenceNumber);
    const mailtoUrl = `mailto:info@costech.or.tz?subject=${encodeURIComponent(
      `Customer feedback form: ${referenceNumber}`
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
          <p className="feedback-eyebrow">Customer feedback form</p>
          <h1>COSTECH Customer Feedback</h1>
          <p>
            COSTECH would like to improve its services and therefore request you
            to take a few minutes to give us your valuable feedback.
          </p>
        </div>
      </div>

      <div className="feedback-body">
        <form className="feedback-form" onSubmit={handleSubmit} noValidate>
          <div className="feedback-section feedback-form-heading">
            <h2>We would like to know if we satisfy you in the following areas</h2>
            <p>Please select the appropriate rating for each service area.</p>
          </div>

          {submission && (
            <div className="feedback-success" role="status">
              <strong>Feedback reference: {submission.reference}</strong>
              <span>
                Your feedback has been prepared for email submission. If your
                email application did not open, use the button below.
              </span>
              <a href={submission.mailtoUrl}>Open email submission</a>
            </div>
          )}

          <div className="feedback-section">
            <div className="feedback-rating-table" role="group" aria-label="Service satisfaction ratings">
              <div className="feedback-rating-header">
                <span>Service area</span>
                {ratingOptions.map((rating) => (
                  <span key={rating}>{rating}</span>
                ))}
              </div>

              {serviceAreas.map((area) => (
                <div className="feedback-rating-row" key={area}>
                  <div className="feedback-rating-area">{area}</div>
                  {ratingOptions.map((rating) => {
                    const inputId = `${area}-${rating}`.replace(/\s+/g, '-').toLowerCase();

                    return (
                      <label className="feedback-rating-option" htmlFor={inputId} key={rating}>
                        <input
                          id={inputId}
                          type="radio"
                          name={`rating-${area}`}
                          value={rating}
                          checked={formData.ratings[area] === rating}
                          onChange={() => updateRating(area, rating)}
                        />
                        <span>{rating}</span>
                      </label>
                    );
                  })}
                </div>
              ))}
            </div>
            {errors.ratings && <span className="feedback-error">{errors.ratings}</span>}
          </div>

          <div className="feedback-section">
            <label className="feedback-message-field">
              Other remarks / suggestions
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={updateField}
                rows="6"
                placeholder="Write any additional comments, recommendations, or suggestions."
              />
            </label>
          </div>

          <div className="feedback-section">
            <h2>Completed By</h2>
            <div className="feedback-grid">
              <label>
                Name <span className="feedback-required">*</span>
                <input
                  type="text"
                  name="completedBy"
                  value={formData.completedBy}
                  onChange={updateField}
                />
                {errors.completedBy && <span className="feedback-error">{errors.completedBy}</span>}
              </label>

              <label>
                Company / Business Name <span className="feedback-required">*</span>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={updateField}
                />
                {errors.companyName && <span className="feedback-error">{errors.companyName}</span>}
              </label>

              <label>
                Sign <span className="feedback-required">*</span>
                <input
                  type="text"
                  name="signature"
                  value={formData.signature}
                  onChange={updateField}
                  placeholder="Type your name"
                />
                {errors.signature && <span className="feedback-error">{errors.signature}</span>}
              </label>

              <label>
                Date <span className="feedback-required">*</span>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={updateField}
                />
                {errors.date && <span className="feedback-error">{errors.date}</span>}
              </label>
            </div>
          </div>

          <div className="feedback-actions">
            <button type="submit">Submit Feedback</button>
            <p>
              Feedback is prepared for submission to COSTECH by email, and a
              local reference is kept in this browser for your records.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FeedbackPage;

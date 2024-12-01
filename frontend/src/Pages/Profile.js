import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import {jwtDecode} from 'jwt-decode'; // For decoding the token
import axios from 'axios'; // For API calls
import "./Profile.css";

const countries = [
  "USA", "Canada", "United Kingdom", "Australia", "India", "Germany", 
  "France", "Japan", "China", "Brazil", "South Africa", "Mexico", 
  "Russia", "Italy", "Spain", "Netherlands", "Sweden", "Norway", 
  "Finland", "Denmark", "New Zealand", "Other"
];

const Profile = () => {
  const defaultValues = {
    FIRST_NAME: '',
    LAST_NAME: '',
    USERNAME: '',
    GENDER: '',
    DATE_OF_BIRTH: '',
    ADDRESS_STREET_NAME:'',
    ADDRESS_STREET_NUM:'',
    ADDRESS_TOWN:'',
    ADDRESS_STATE:'',
    ADDRESS_ZIPCODE:'',
    RACE: '',
    VETERAN_STATUS: '',
    DISABILITY_STATUS: '',
    CITIZENSHIP_STATUS: '',
    education: [{ universityName: '', graddate: '', major:'', degree: '', gpa: '' }],
    workExperience: [{ company: '', months: '', role: '', description: '' }],
  };
  
  const [initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token (assuming it's stored in localStorage)
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
  
        // Decode token to extract USERNAME
        const decoded = jwtDecode(token);
        const USERNAME = decoded?.username;
        if (!USERNAME) throw new Error('Invalid token');
  
        // Fetch user data
        const response = await axios.get(`http://localhost:4000/users/${USERNAME}`);
        const userData = response.data;
  
        // Update initial values
        setInitialValues({
          ...defaultValues,
          ...userData, // Populate with fetched data
        });
        console.log(initialValues);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    FIRST_NAME: Yup.string().required('First name is required'),
    LAST_NAME: Yup.string().required('Last name is required'),
    USERNAME: Yup.string().required('USERNAME is required'),
    GENDER: Yup.string().required('GENDER is required'),
    DATE_OF_BIRTH: Yup.date().required('Date of Birth is required'),
    ADDRESS_STREET_NAME:Yup.string().required('Street name is required'),
    ADDRESS_STREET_NUM:Yup.string().required('Street number is required'),
    ADDRESS_TOWN:Yup.string().required('Town is required'),
    ADDRESS_STATE:Yup.string().required('State is required'),
    ADDRESS_ZIPCODE: Yup.string().required('Zip code is required'),
  
    RACE: Yup.string(),
    VETERAN_STATUS: Yup.boolean().required('Veteran status is required'),
    DISABILITY_STATUS: Yup.boolean().required('Disability status is required'),
    CITIZENSHIP_STATUS: Yup.string().required('Citizenship status is required'),
    education: Yup.array().of(
      Yup.object({
        universityName: Yup.string().required('University name is required'),
        graddate: Yup.date(),
        major: Yup.string().required('Major is required'),
        degree: Yup.string().required('Degree is required'),
        gpa: Yup.string(),
      })
    ),
    workExperience: Yup.array().of(
      Yup.object({
        company: Yup.string().required('Company name is required'),
        months: Yup.number().required('Number of months is required'),
        role: Yup.string().required('Role is required'),
        description: Yup.string(),
      })
    ),
  });

  const handleSubmit = (values) => {
    console.log('Form data submitted:', values);
  };
  return (
    <div className="profile-container-box">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className="profile-form">
            {/* Personal Information Section */}
            <div className="profile-personal-info">
              <h2 className="profile-section-heading">Personal Information</h2>

              <div className="profile-form-row">
                <label htmlFor="FIRST_NAME" className="profile-label">First Name</label>
                <Field type="text" name="FIRST_NAME" className="profile-input" />
                <ErrorMessage name="FIRST_NAME" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label htmlFor="LAST_NAME" className="profile-label">Last Name</label>
                <Field type="text" name="LAST_NAME" className="profile-input" />
                <ErrorMessage name="LAST_NAME" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label htmlFor="USERNAME" className="profile-label">Username</label>
                <Field type="text" name="USERNAME" className="profile-input" />
                <ErrorMessage name="USERNAME" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label htmlFor="GENDER" className="profile-label">Gender</label>
                <Field component="select" name="GENDER" className="profile-input">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="GENDER" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label htmlFor="DATE_OF_BIRTH" className="profile-label">Date of Birth</label>
                <Field type="date" name="DATE_OF_BIRTH" className="profile-input" />
                <ErrorMessage name="DATE_OF_BIRTH" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label htmlFor="ADDRESS_STREET_NAME" className="profile-label">Street No.</label>
                <Field type="text" name="ADDRESS_STREET_NAME" className="profile-input" />
                <ErrorMessage name="ADDRESS_STREET_NAME" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label htmlFor="ADDRESS_STREET_NAME" className="profile-label">Street Name</label>
                <Field type="text" name="ADDRESS_STREET_NAME" className="profile-input" />
                <ErrorMessage name="ADDRESS_STREET_NAME" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label htmlFor="ADDRESS_TOWN" className="profile-label">Town</label>
                <Field type="text" name="ADDRESS_TOWN" className="profile-input" />
                <ErrorMessage name="ADDRESS_TOWN" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label htmlFor="ADDRESS_STATE" className="profile-label">State</label>
                <Field type="text" name="ADDRESS_STATE" className="profile-input" />
                <ErrorMessage name="ADDRESS_STATE" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label htmlFor="ADDRESS_ZIPCODE" className="profile-label">Zip</label>
                <Field type="text" name="ADDRESS_ZIPCODE" className="profile-input" />
                <ErrorMessage name="ADDRESS_ZIPCODE" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label className="profile-label">Race</label>
                <Field component="select" name="RACE" className="profile-input">
                  <option value="">Select</option>
                  <option value="Asian">Asian</option>
                  <option value="Black">Black</option>
                  <option value="Hispanic">Hispanic</option>
                  <option value="White">White</option>
                  <option value="Native American">Native American</option>
                  <option value="Other">Other</option>
                </Field>
              </div>

              <div className="profile-form-row">
                <label className="profile-label">Veteran Status</label>
                <div>
                  <label className="radio-label">
                    <Field type="radio" name="VETERAN_STATUS" value="true" /> Yes
                  </label>
                  <label className="radio-label">
                    <Field type="radio" name="VETERAN_STATUS" value="false" /> No
                  </label>
                </div>
                <ErrorMessage name="VETERAN_STATUS" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label className="profile-label">Disability Status</label>
                <div>
                  <label className="radio-label">
                    <Field type="radio" name="DISABILITY_STATUS" value="true" /> Yes
                  </label>
                  <label className="radio-label">
                    <Field type="radio" name="DISABILITY_STATUS" value="false" /> No
                  </label>
                </div>
                <ErrorMessage name="DISABILITY_STATUS" component="div" className="profile-error" />
              </div>

              <div className="profile-form-row">
                <label className="profile-label">Citizenship Status</label>
                <Field component="select" name="CITIZENSHIP_STATUS" className="profile-input">
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="CITIZENSHIP_STATUS" component="div" className="profile-error" />
              </div>
            </div>

            {/* Education Section */}
            <section className="profile-education">
              <h2 className="profile-section-heading">Education</h2>
              <FieldArray name="education">
                {({ push, remove }) => (
                  <>
                    {values.education.map((education, index) => (
                      <div key={index} className="profile-education-row">
                        <div className="profile-form-row">
                          <label htmlFor={`education[${index}].universityName`} className="profile-label">University Name</label>
                          <Field type="text" name={`education[${index}].universityName`} className="profile-input" />
                          <ErrorMessage name={`education[${index}].universityName`} component="div" className="profile-error" />
                        </div>

                        <div className="profile-form-row">
                          <label htmlFor={`education[${index}].graddate`} className="profile-label">Grad Date</label>
                          <Field type="date" name={`education[${index}].graddate`} className="profile-input" />
                        </div>

                        <div className="profile-form-row">
                          <label htmlFor={`education[${index}].major`} className="profile-label">Major</label>
                          <Field type="text" name={`education[${index}].major`} className="profile-input" />
                          <ErrorMessage name={`education[${index}].major`} component="div" className="profile-error" />
                        </div>

                        <div className="profile-form-row">
                          <label htmlFor={`education[${index}].degree`} className="profile-label">Degree</label>
                          <Field type="text" name={`education[${index}].degree`} className="profile-input" />
                          <ErrorMessage name={`education[${index}].degree`} component="div" className="profile-error" />
                        </div>

                        <div className="profile-form-row">
                          <label htmlFor={`education[${index}].gpa`} className="profile-label">GPA</label>
                          <Field type="text" name={`education[${index}].gpa`} className="profile-input" />
                        </div>

                        <button type="button" onClick={() => remove(index)} className="remove-button">
                          Remove Education
                        </button>
                      </div>
                    ))}

                    <button type="button" onClick={() => push({ universityName: '', graddate: '', degree: '', gpa: '' })} className="add-button">
                      Add Education
                    </button>
                  </>
                )}
              </FieldArray>
            </section>

            {/* Work Experience Section */}
            <section className="profile-work-experience">
              <h2 className="profile-section-heading">Work Experience</h2>
              <FieldArray name="workExperience">
                {({ push, remove }) => (
                  <>
                    {values.workExperience.map((work, index) => (
                      <div key={index} className="profile-work-experience-row">
                        <div className="profile-form-row">
                          <label htmlFor={`workExperience[${index}].company`} className="profile-label">Company</label>
                          <Field type="text" name={`workExperience[${index}].company`} className="profile-input" />
                          <ErrorMessage name={`workExperience[${index}].company`} component="div" className="profile-error" />
                        </div>

                        <div className="profile-form-row">
                          <label htmlFor={`workExperience[${index}].months`} className="profile-label">Number of Months</label>
                          <Field type="number" name={`workExperience[${index}].months`} className="profile-input" />
                          <ErrorMessage name={`workExperience[${index}].months`} component="div" className="profile-error" />
                        </div>

                        <div className="profile-form-row">
                          <label htmlFor={`workExperience[${index}].role`} className="profile-label">Role</label>
                          <Field type="text" name={`workExperience[${index}].role`} className="profile-input" />
                          <ErrorMessage name={`workExperience[${index}].role`} component="div" className="profile-error" />
                        </div>

                        <div className="profile-form-row">
                          <label htmlFor={`workExperience[${index}].description`} className="profile-label">Description</label>
                          <Field type="text" name={`workExperience[${index}].description`} className="profile-input" />
                        </div>

                        <button type="button" onClick={() => remove(index)} className="remove-button">
                          Remove Work Experience
                        </button>
                      </div>
                    ))}

                    <button type="button" onClick={() => push({ company: '', months: '', role: '', description: '' })} className="add-button">
                      Add Work Experience
                    </button>
                  </>
                )}
              </FieldArray>
            </section>

            {/* Submit Button */}
            <div className="profile-submit">
              <button type="submit" className="profile-submit-btn">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Profile;
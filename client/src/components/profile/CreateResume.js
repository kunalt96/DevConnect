import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  headingTop: {
    marginTop: '10',
    textAlign: 'center',
  },
  viewDetails: {
    marginTop: 20,
    marginLeft: 10,
  },
  fontHeading: {
    fontSize: 20,
    fontWeight: 700,
  },
  textHeading: {
    fontSize: 14,
    fontWeight: 300,
  },
});

export function CreateResume({ data }) {
  console.log('i am called');
  console.log(data);
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View>
          <View style={styles.headingTop}>
            <Text>{data.user.name}</Text>
            <Text>{data.location}</Text>
            <Text>{data.website}</Text>
          </View>
          <View style={styles.viewDetails}>
            <Text style={styles.fontHeading}>About Me</Text>
            <Text style={styles.textHeading}>{data.bio}</Text>
          </View>
          <View style={styles.viewDetails}>
            <Text style={styles.fontHeading}>Skills</Text>
            <Text style={styles.textHeading}>
              {data.skills.map((skill, index) => {
                return (
                  <React.Fragment key={index}>{skill} &nbsp;</React.Fragment>
                );
              })}
            </Text>
          </View>
          <View style={styles.viewDetails}>
            <Text style={styles.fontHeading}>Experience</Text>
            {data.experience?.map((exp, index) => {
              return (
                <Text style={styles.textHeading} key={index}>
                  {exp.title} in {exp.company.toLowerCase()} located in{' '}
                  {exp.location}
                </Text>
              );
            })}
          </View>
          <View style={styles.viewDetails}>
            <Text>Education</Text>
            {data.education?.map((education, index) => {
              return (
                <Text style={styles.textHeading} key={index}>
                  Completed {education.degree} from {education.school} with
                  major in {education.fieldofstudy}
                </Text>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default CreateResume;

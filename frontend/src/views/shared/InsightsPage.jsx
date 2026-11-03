import React from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { IconAlertTriangle, IconArrowUpRight, IconBrain, IconSchool, IconShieldCheck, IconSparkles, IconTargetArrow } from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import { useGetPerformanceInsightsQuery } from 'src/slices/examApiSlice';

const MetricCard = ({ label, value, icon: Icon, accent }) => (
  <Card elevation={4} sx={{ borderRadius: '18px', height: '100%' }}>
    <Box sx={{ height: 4, background: accent }} />
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>{label}</Typography>
          <Typography variant="h4" fontWeight={800} mt={1}>{value}</Typography>
        </Box>
        <Box sx={{ width: 48, height: 48, borderRadius: '14px', display: 'grid', placeItems: 'center', color: '#fff', background: accent }}>
          <Icon size={22} />
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const InsightsPage = () => {
  const { data, isLoading, isError, error } = useGetPerformanceInsightsQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <PageContainer title="Insights" description="Personalized student and teacher insights">
        <Alert severity="error">{error?.data?.message || error?.error || 'Failed to load insights.'}</Alert>
      </PageContainer>
    );
  }

  const isTeacher = data?.role === 'teacher';

  return (
    <PageContainer title="Insights" description="Personalized student and teacher insights">
      <Box mb={3}>
        <Typography variant="h3" fontWeight={800}>Insights Center</Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          {isTeacher
            ? 'See who is thriving, who needs attention, and how your recent exams are performing.'
            : 'Track your momentum, spot weak areas, and see what to focus on next.'}
        </Typography>
      </Box>

      {!isTeacher ? (
        <>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard label="Attempts" value={data?.summary?.totalAttempts ?? 0} icon={IconSchool} accent="linear-gradient(135deg,#6C63FF,#A78BFA)" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard label="Average Score" value={`${data?.summary?.averagePercentage ?? 0}%`} icon={IconTargetArrow} accent="linear-gradient(135deg,#00D4AA,#00B894)" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard label="Trend" value={`${data?.summary?.improvementTrend ?? 0} pts`} icon={IconArrowUpRight} accent="linear-gradient(135deg,#F59E0B,#F97316)" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard label="Pending Exams" value={data?.summary?.pendingExams ?? 0} icon={IconBrain} accent="linear-gradient(135deg,#EC4899,#A855F7)" />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Card elevation={4} sx={{ borderRadius: '18px' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <IconSparkles size={20} color="#6C63FF" />
                    <Typography variant="h5" fontWeight={700}>Recommendations</Typography>
                  </Stack>
                  <List disablePadding>
                    {(data?.recommendations || []).map((item, index) => (
                      <ListItem key={`${item}-${index}`} sx={{ px: 0, alignItems: 'flex-start' }}>
                        <ListItemText primaryTypographyProps={{ fontWeight: 600 }} primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                <Card elevation={4} sx={{ borderRadius: '18px' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={1}>Best Performance</Typography>
                    {data?.strongestExam ? (
                      <>
                        <Typography variant="body1" fontWeight={600}>{data.strongestExam.examName}</Typography>
                        <Chip sx={{ mt: 1 }} color="success" label={`${data.strongestExam.percentage}%`} />
                      </>
                    ) : (
                      <Typography color="text.secondary">No data yet.</Typography>
                    )}
                  </CardContent>
                </Card>
                <Card elevation={4} sx={{ borderRadius: '18px' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={1}>Needs Attention</Typography>
                    {data?.needsAttentionExam ? (
                      <>
                        <Typography variant="body1" fontWeight={600}>{data.needsAttentionExam.examName}</Typography>
                        <Chip sx={{ mt: 1 }} color="warning" label={`${data.needsAttentionExam.percentage}%`} />
                      </>
                    ) : (
                      <Typography color="text.secondary">No data yet.</Typography>
                    )}
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Card elevation={4} sx={{ borderRadius: '18px' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <IconShieldCheck size={20} color="#00B894" />
                    <Typography variant="h5" fontWeight={700}>Recent Attempts</Typography>
                  </Stack>
                  {data?.recentTimeline?.length ? (
                    <Stack divider={<Divider />}>
                      {data.recentTimeline.map((item) => (
                        <Stack key={item.id} direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" py={1.5}>
                          <Box>
                            <Typography fontWeight={700}>{item.examName}</Typography>
                            <Typography variant="body2" color="text.secondary">{new Date(item.submittedAt).toLocaleString()}</Typography>
                          </Box>
                          <Stack direction="row" spacing={1} mt={{ xs: 1, sm: 0 }}>
                            <Chip label={`${item.percentage}%`} color={item.percentage >= 40 ? 'success' : 'error'} />
                            <Chip label={`Trust ${item.trustScore}`} color={item.trustScore >= 70 ? 'primary' : 'warning'} variant="outlined" />
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  ) : (
                    <Typography color="text.secondary">No attempts yet.</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard label="Exams Created" value={data?.summary?.totalExams ?? 0} icon={IconSchool} accent="linear-gradient(135deg,#6C63FF,#A78BFA)" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard label="Submissions" value={data?.summary?.totalSubmissions ?? 0} icon={IconBrain} accent="linear-gradient(135deg,#00D4AA,#00B894)" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard label="Average Score" value={`${data?.summary?.averageScore ?? 0}%`} icon={IconTargetArrow} accent="linear-gradient(135deg,#F59E0B,#F97316)" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard label="At-Risk Students" value={data?.summary?.atRiskStudents ?? 0} icon={IconAlertTriangle} accent="linear-gradient(135deg,#EC4899,#A855F7)" />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Card elevation={4} sx={{ borderRadius: '18px', height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={700} mb={2}>Top Students</Typography>
                  {data?.topStudents?.length ? (
                    <Stack divider={<Divider />}>
                      {data.topStudents.map((student) => (
                        <Stack key={student.studentId} direction="row" justifyContent="space-between" py={1.5}>
                          <Box>
                            <Typography fontWeight={700}>{student.studentName}</Typography>
                            <Typography variant="body2" color="text.secondary">{student.studentEmail}</Typography>
                          </Box>
                          <Stack alignItems="flex-end">
                            <Chip color="success" label={`${student.averagePercentage}%`} />
                            <Typography variant="caption" color="text.secondary" mt={0.5}>Trust {student.averageTrust}</Typography>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  ) : (
                    <Typography color="text.secondary">No submission data yet.</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Card elevation={4} sx={{ borderRadius: '18px', height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={700} mb={2}>Students Needing Attention</Typography>
                  {data?.atRiskStudents?.length ? (
                    <Stack divider={<Divider />}>
                      {data.atRiskStudents.map((student) => (
                        <Stack key={student.studentId} direction="row" justifyContent="space-between" py={1.5}>
                          <Box>
                            <Typography fontWeight={700}>{student.studentName}</Typography>
                            <Typography variant="body2" color="text.secondary">{student.studentEmail}</Typography>
                          </Box>
                          <Stack alignItems="flex-end">
                            <Chip color="warning" label={`${student.averagePercentage}%`} />
                            <Typography variant="caption" color="text.secondary" mt={0.5}>Trust {student.averageTrust}</Typography>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  ) : (
                    <Typography color="text.secondary">No at-risk students detected.</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card elevation={4} sx={{ borderRadius: '18px' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={700} mb={2}>Recent Exam Health</Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Exam</TableCell>
                        <TableCell>Attempts</TableCell>
                        <TableCell>Average Score</TableCell>
                        <TableCell>Pass Rate</TableCell>
                        <TableCell>Live Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(data?.examSummaries || []).map((exam) => (
                        <TableRow key={exam.examId}>
                          <TableCell>{exam.examName}</TableCell>
                          <TableCell>{exam.attempts}</TableCell>
                          <TableCell>{exam.averagePercentage}%</TableCell>
                          <TableCell>{exam.passRate}%</TableCell>
                          <TableCell>{exam.liveDate ? new Date(exam.liveDate).toLocaleDateString() : 'Not scheduled'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </PageContainer>
  );
};

export default InsightsPage;
